import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get("sessionId");

        if (!sessionId) return new NextResponse("Missing sessionId", { status: 400 });

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Verify session belongs to this user and is complete
        if (session.status !== "complete" || session.metadata?.userId !== userId) {
            return new NextResponse("Invalid session", { status: 400 });
        }

        const plan = session.metadata?.plan;
        const subscriptionId = session.subscription as string | undefined;
        const customerId = session.customer as string | undefined;

        if (!plan || (plan !== "pro" && plan !== "premium")) {
            return new NextResponse("Invalid plan in session", { status: 400 });
        }

        // Check if this session was already processed (e.g. by webhook)
        const existing = await db.payment.findFirst({
            where: { stripeSessionId: session.id },
        });

        if (!existing) {
            await db.user.update({
                where: { id: userId },
                data: {
                    plan: plan as "pro" | "premium",
                    hasPaid: true,
                    paidAt: new Date(),
                    canceledAt: null,
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
        }

        return NextResponse.json({ success: true, plan });
    } catch (error) {
        console.error("[VERIFY-SESSION]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
