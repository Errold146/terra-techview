import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request, {params}: {params: Promise<{id: string}>}) {

    try {
        const { id } = await params
        const { userId } = await auth()
        if ( !userId ) return new NextResponse('Unaurhorized', { status: 401 });

        const interview = await db.interview.findUnique({ where: { id }})
        if ( !interview ) return NextResponse.json("Interview not Found", { status: 404 });

        return NextResponse.json(interview)

    } catch (error) {
        console.error(error)
        return new NextResponse("Error getting interview", { status: 500 })
    }
}

export async function DELETE(req: Request, {params}: {params: Promise<{id: string}>}) {

    try {
        const { id } = await params
        const { userId } = await auth()
        if ( !userId ) return new NextResponse('Unauthorized', { status: 401 });

        const interview = await db.interview.findUnique({ where: { id } })
        if ( !interview ) return new NextResponse('Interview not found', { status: 404 });
        if ( interview.userId !== userId ) return new NextResponse('Forbidden', { status: 403 });

        await db.interview.delete({ where: { id } })

        return NextResponse.json({ message: 'Interview deleted successfully' })

    } catch (error) {
        console.error(error)
        return new NextResponse("Error deleting interview", { status: 500 })
    }
}

