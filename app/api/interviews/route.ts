import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    try {
        const { userId } = await auth()
        if ( !userId ) return new NextResponse('Unauthorized', { status: 401 });

        const interviews = await db.interview.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(interviews)

    } catch (error) {
        console.error('[GET /api/interviews]', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
