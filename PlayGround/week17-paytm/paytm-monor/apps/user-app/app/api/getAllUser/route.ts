import { NextResponse } from "next/server"
import db from "@repo/db/testClient";


export const GET = async () => {
    const users = await db.user.findMany()
    return NextResponse.json({
        users: users
    })
}


