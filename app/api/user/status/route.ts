import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { parsePlan } from "@/lib/plan";

const FALLBACK = { plan: "free" as const, hasPaid: false, hasUsedFreeTrial: false, dailyLimitReached: false }

const FREE_DAILY_LIMIT = 1

export async function GET() {
    try {
        const { userId } = await auth()
        if ( !userId ) return new NextResponse("Unauthorized", { status: 401 });

        const user = await db.user.findUnique({
            where: { id: userId },
            select: {
                plan: true,
                hasPaid: true,
                hasUsedFreeTrial: true,
            }
        })

        if (!user) return NextResponse.json(FALLBACK)

        const plan = parsePlan(user.plan)

        let dailyLimitReached = false
        if (!user.hasPaid && plan === "free") {
            const startOfToday = new Date()
            startOfToday.setHours(0, 0, 0, 0)
            const todayCount = await db.interview.count({
                where: { userId, startedAt: { gte: startOfToday } },
            })
            dailyLimitReached = todayCount >= FREE_DAILY_LIMIT
        }

        return NextResponse.json({
            plan,
            hasPaid: user.hasPaid,
            hasUsedFreeTrial: user.hasUsedFreeTrial,
            dailyLimitReached,
        })

    } catch (error) {
        console.error('[GET /api/user/status]', error)
        // Return fallback instead of 500 — plan data is non-critical
        return NextResponse.json(FALLBACK)
    }
}
