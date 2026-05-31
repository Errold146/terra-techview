import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
        return new NextResponse("Missing stripe-signature header", { status: 400 });
    }

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error("[WEBHOOK] Signature verification failed:", err);
        return new NextResponse(`Webhook error: ${err}`, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, plan } = session.metadata ?? {};

        if (userId && plan) {
            const subscriptionId = session.subscription as string | undefined;
            const customerId = session.customer as string | undefined;

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
    }

    if (event.type === "customer.subscription.deleted") {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await db.user.updateMany({
            where: { stripeCustomerId: customerId },
            data: {
                plan: "free",
                hasPaid: false,
                canceledAt: new Date(),
                stripeSubscriptionId: null,
            },
        });

        await db.payment.updateMany({
            where: { stripeSubscriptionId: subscription.id },
            data: { status: "canceled" },
        });
    }

    return NextResponse.json({ received: true });
}
