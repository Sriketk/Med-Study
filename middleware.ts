import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

//middleware to check if the user is logged in
//uses cookies to check if the user is logged in
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
 
    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", request.url));
	}
 
	return NextResponse.next();
}
 
export const config = {
	matcher: ["/home"], // Specify the routes the middleware applies to
};