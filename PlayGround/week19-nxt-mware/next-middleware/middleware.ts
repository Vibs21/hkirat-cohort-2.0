import { NextRequest, NextResponse } from 'next/server';


let requestCount = 0;
export function middleware(req: NextRequest) {
    requestCount++;
    console.log('number of request is: ', requestCount);
    const response = NextResponse.next();

    response.headers.set('X-Request-Count', requestCount.toString());

    return response
}