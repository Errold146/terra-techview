import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const user = await db.user.findUnique({
            where: { id: userId },
            select: { stripeCustomerId: true },
        });

        if (!user?.stripeCustomerId) {
            return new NextResponse("No active subscription", { status: 400 });
        }

        const subscriptions = await stripe.subscriptions.list({
            customer: user.stripeCustomerId,
            status: "active",
            limit: 1,
        });

        if (subscriptions.data.length === 0) {
            return new NextResponse("No active subscription found", { status: 400 });
        }

        const subscription = subscriptions.data[0];
        await stripe.subscriptions.cancel(subscription.id);

        await db.user.update({
            where: { id: userId },
            data: {
                plan: "free",
                hasPaid: false,
                canceledAt: new Date(),
                stripeSubscriptionId: null,
            },
        });

        await db.payment.updateMany({
            where: { userId, status: "active" },
            data: { status: "canceled" },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[CANCEL]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
