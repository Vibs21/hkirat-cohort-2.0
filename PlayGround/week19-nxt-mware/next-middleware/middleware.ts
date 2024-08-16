import { NextRequest, NextResponse } from 'next/server';


let requestCount = 0;
export function middleware1(req: NextRequest) {
    requestCount++;
    console.log('number of request is: ', requestCount);
    const response = NextResponse.next();

    response.headers.set('X-Request-Count', requestCount.toString());

    return response
}

//NOTE: Now it will only run when the route gets matched with the path
// export const config = {
//     matcher: '/api/:path*',
// }

// NOTE: this is path matched, if you want to do something for the specific route, then you can match the path and do the logic thing
export function middleware(request: NextRequest) {
    console.log(request.nextUrl.pathname)
    if (request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }
   
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.next()
    }
}


