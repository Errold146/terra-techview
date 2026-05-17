import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request, {params} : {params: Promise<{id: string}>}) {
    try {
        const { id } = await params
        const { transcript } = await req.json()

        await db.interview.update({
            where: { id },
            data: {
                completedAt: new Date(),
                transcript: transcript || []
            }
        })

        return NextResponse.json({message: "Interview completed successfully"})

    } catch (error) {
        console.error(error)
        return new NextResponse("Internal server errror", { status: 500 })
    }
}
