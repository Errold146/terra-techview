import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Stripe return URL handler.
 * Called when the user is redirected back after completing (or cancelling) checkout.
 * URL: /api/stripe/complete?session_id={CHECKOUT_SESSION_ID}
 */
export async function GET(req: NextRequest) {
    const dashboardUrl = new URL("/dashboard", req.url).toString();

    try {
        const { userId } = await auth();
        if (!userId) {
            // Not authenticated — redirect to sign-in
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }

        const sessionId = req.nextUrl.searchParams.get("session_id");
        if (!sessionId) {
            return NextResponse.redirect(dashboardUrl);
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Only process completed sessions that belong to this user
        if (
            session.status !== "complete" ||
            session.payment_status !== "paid" ||
            session.metadata?.userId !== userId
        ) {
            console.warn("[STRIPE_COMPLETE] Session not valid:", {
                status: session.status,
                payment_status: session.payment_status,
                metaUserId: session.metadata?.userId,
                userId,
            });
            return NextResponse.redirect(dashboardUrl);
        }

        const plan = session.metadata?.plan;
        const subscriptionId = session.subscription as string | undefined;
        const customerId = session.customer as string | undefined;

        if (!plan || (plan !== "pro" && plan !== "premium")) {
            console.warn("[STRIPE_COMPLETE] Invalid plan in metadata:", plan);
            return NextResponse.redirect(dashboardUrl);
        }

        // Avoid duplicate processing (e.g. webhook already handled it)
        const existing = await db.payment.findFirst({
            where: { stripeSessionId: session.id },
        });

        if (!existing) {
            // Upsert user — create if not exists, update if exists
            await db.user.upsert({
                where: { id: userId },
                update: {
                    plan: plan as "pro" | "premium",
                    hasPaid: true,
                    paidAt: new Date(),
                    canceledAt: null,
                    stripeCustomerId: customerId,
                    stripeSubscriptionId: subscriptionId,
                },
                create: {
                    id: userId,
                    plan: plan as "pro" | "premium",
                    hasPaid: true,
                    paidAt: new Date(),
                    stripeCustomerId: customerId,
                    stripeSubscriptionId: subscriptionId,
                },
            });

            await db.payment.create({
                data: {
                    userId,
                    plan: plan as "pro" | "premium",
                    amount: (session.amount_total ?? 0) / 100,
                    stripeSessionId: session.id,
                    stripeSubscriptionId: subscriptionId,
                    status: "active",
                },
            });

            console.log("[STRIPE_COMPLETE] User updated:", { userId, plan });
        } else {
            console.log("[STRIPE_COMPLETE] Already processed:", session.id);
        }
    } catch (error) {
        console.error("[STRIPE_COMPLETE] Error:", error);
    }

    return NextResponse.redirect(dashboardUrl);
}
