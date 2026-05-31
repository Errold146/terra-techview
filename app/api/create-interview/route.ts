import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

const FREE_TRIAL_DAYS = 30
const FREE_DAILY_LIMIT = 1

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if ( !userId ) return new NextResponse("Unauthorized", { status: 401 });

        let user = await db.user.findUnique({ where: { id: userId }})
        if ( !user ) {
            const clerkUser = await currentUser()
            user = await db.user.create({
                data: {
                    id: userId,
                    name: clerkUser ? `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() : null,
                    email: clerkUser?.emailAddresses[0]?.emailAddress ?? null,
                }
            })
        }

        // Enforce free plan restrictions
        if (!user.hasPaid && user.plan === "free") {
            // Check if free trial has expired (30 days from account creation)
            const trialStart = new Date(user.createdAt)
            const trialExpiry = new Date(trialStart)
            trialExpiry.setDate(trialExpiry.getDate() + FREE_TRIAL_DAYS)

            if (new Date() > trialExpiry) {
                return NextResponse.json(
                    { error: "free_trial_expired" },
                    { status: 403 }
                )
            }

            // Check daily interview limit
            const startOfToday = new Date()
            startOfToday.setHours(0, 0, 0, 0)

            const todayCount = await db.interview.count({
                where: {
                    userId,
                    startedAt: { gte: startOfToday },
                },
            })

            if (todayCount >= FREE_DAILY_LIMIT) {
                return NextResponse.json(
                    { error: "daily_limit_reached" },
                    { status: 429 }
                )
            }
        }

        const { name, rol, level, language } = await req.json()
        const interview = await db.interview.create({
            data: { userId, name, rol, level, language: language ?? "English" }
        })

        return NextResponse.json(interview)

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
