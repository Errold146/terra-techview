import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLAN_PRICES: Record<string, string> = {
    pro: process.env.STRIPE_PRO_PRICE_ID!,
    premium: process.env.STRIPE_PREMIUM_PRICE_ID!,
};

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const { plan } = await req.json();

        if (!plan || !PLAN_PRICES[plan]) {
            return new NextResponse("Invalid plan", { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            ui_mode: "embedded_page",
            mode: "subscription",
            line_items: [{ price: PLAN_PRICES[plan], quantity: 1 }],
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/complete?session_id={CHECKOUT_SESSION_ID}`,
            metadata: { userId, plan },
        });

        return NextResponse.json({ clientSecret: session.client_secret });
    } catch (error) {
        console.error("[CHECKOUT]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
