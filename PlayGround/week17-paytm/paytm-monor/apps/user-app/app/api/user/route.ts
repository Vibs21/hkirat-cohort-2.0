import { NextResponse } from "next/server"
import db from "@repo/db/testClient";


export const GET = async () => {
    await db.user.create({
        data: {
            email: "asd2",
            name: "adsads"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}


