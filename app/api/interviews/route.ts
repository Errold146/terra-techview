import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {

    const { userId } = await auth()
    if ( !userId ) return new NextResponse('Unaurhorized', { status: 401 });

    const interviews = await db.interview.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(interviews)
}
