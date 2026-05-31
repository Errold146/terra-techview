import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { parsePlan } from "@/lib/plan";

const FREE_TRIAL_DAYS = 30
const FREE_DAILY_LIMIT = 1

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const { userId } = await auth()
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })

        const [user, interview] = await Promise.all([
            db.user.findUnique({ where: { id: userId } }),
            db.interview.findUnique({ where: { id } }),
        ])

        if (!interview) return new NextResponse("Interview not found", { status: 404 })
        if (!user) return new NextResponse("User not found", { status: 404 })
        if (interview.userId !== userId) return new NextResponse("Forbidden", { status: 403 })

        const plan = parsePlan(user.plan)

        // Aplicar restricciones solo al plan gratuito
        if (!user.hasPaid && plan === "free") {
            // Verificar expiración del trial (30 días desde la creación de la cuenta)
            const trialExpiry = new Date(user.createdAt)
            trialExpiry.setDate(trialExpiry.getDate() + FREE_TRIAL_DAYS)

            if (new Date() > trialExpiry) {
                return NextResponse.json({ error: "free_trial_expired" }, { status: 403 })
            }

            // Contar sesiones iniciadas hoy (nuevas O reutilizadas)
            const startOfToday = new Date()
            startOfToday.setHours(0, 0, 0, 0)

            const todayCount = await db.interview.count({
                where: { userId, startedAt: { gte: startOfToday } },
            })

            // Bloqueado si ya hay una sesión hoy Y esta entrevista no es la de hoy
            const isAlreadyTodaySession = interview.startedAt >= startOfToday
            if (todayCount >= FREE_DAILY_LIMIT && !isAlreadyTodaySession) {
                return NextResponse.json({ error: "daily_limit_reached" }, { status: 429 })
            }
        }

        // Marcar como iniciada ahora
        await db.interview.update({
            where: { id },
            data: { startedAt: new Date() },
        })

        return NextResponse.json({ ok: true })

    } catch (error) {
        console.error("[POST /api/interview/[id]/start]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
