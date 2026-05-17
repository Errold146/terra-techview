import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if ( !userId ) return new NextResponse("Unathorized", { status: 401 });

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
