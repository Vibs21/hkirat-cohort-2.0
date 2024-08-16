import { NextResponse } from 'next/server';


export function GET(req: NextResponse) {
    const myCookie = req.headers.get('x-request-count');
    return NextResponse.json({
        message: myCookie,
    })
}

