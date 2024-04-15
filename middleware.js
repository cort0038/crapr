import {NextResponse} from "next/server"
import {updateSession, logout, login} from "@/app/actions"
export async function middleware(request) {
	//middleware gets the request object (a NextRequest) before anything else
	//request object in route.js or middleware.js has a cookies object
	//we can read cookies or write cookies

	//code here runs for every page listed in the config object
	let response = await updateSession(request) //updateSession function in actions

	//must return a response object (NextResponse) or null/undefined
	//you could also do a redirect which sends the request to a new page
	//NextResponse.redirect(new URL('/home', request.url))
	//you can rewrite which keeps the old url and loads a different page
	//NextResponse.rewrite(new URL('/fake', request.url))

	//it is on this response that we can set the cookie
	//If you want different things for different pages... Eg: Authorization...
	if (request.nextUrl.pathname.startsWith("/secret")) {
		if (!response) {
			response = NextResponse.next()
		}
		// console.log('secret page middleware');
		// console.log(request.cookies.has('token'));
		if (!request.cookies.has("token")) {
			//trying to access this page when NOT logged in
			//send the user back to '/' when they try to access this
			return NextResponse.redirect(request.nextUrl.origin)
		}
		return response
	}
	if (request.nextUrl.pathname.startsWith("/anyone")) {
		if (!response) {
			response = NextResponse.next()
		}
		//anyone can access this... logged in or not
		//do what you want
		// console.log('anyone page middleware');
		return response
	}
	if (request.nextUrl.pathname.startsWith("/logout")) {
		//logout means getting rid of the token cookie
		await logout() //function from actions.js
		if (!response) {
			response = NextResponse.next()
		}
		return response
	}
	if (request.nextUrl.pathname === "/login") {
		//what do you want to do on the home page
		if (!response) {
			response = NextResponse.next() //the response object that will contain layout.js and page.js
		}
		if (request.nextUrl.searchParams.has("token")) {
			//finish the login process by saving the token from the querystring as a cookie
			// console.log('SET TOKEN', request.nextUrl.searchParams.get('token'));
			await login(response, request.nextUrl.searchParams.get("token")) //function from actions.js
		}
		return response
	}
	if (request.nextUrl.pathname === "/") {
		//what do you want to do on the home page
		if (!response) {
			response = NextResponse.next() //the response object that will contain layout.js and page.js
		}
		return response
	}
}

//config object defines with which requests the middleware is called
//https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
export const config = {
	matcher: ["/", "/secret", "/login", "/logout"]
}
