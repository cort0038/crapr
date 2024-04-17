import {NextResponse} from "next/server"
import {updateSession, logout, login} from "@/app/actions"

export async function middleware(request) {
	let response = await updateSession(request)

	//private pages redirect to homepage if not logged in
	if (request.nextUrl.pathname.startsWith("/wiped")) {
		if (!response) {
			response = NextResponse.next()
		}
		if (!request.cookies.has("token")) {
			return NextResponse.redirect(request.nextUrl.origin)
		}
		return response
	} else if (request.nextUrl.pathname.startsWith("/offer")) {
		if (!response) {
			response = NextResponse.next()
		}
		if (!request.cookies.has("token")) {
			return NextResponse.redirect(request.nextUrl.origin)
		}
		return response
	} else if (request.nextUrl.pathname.startsWith("/mine")) {
		if (!response) {
			response = NextResponse.next()
		}
		if (!request.cookies.has("token")) {
			return NextResponse.redirect(request.nextUrl.origin)
		}
		return response
	} else if (request.nextUrl.pathname.startsWith("/crap")) {
		if (!response) {
			response = NextResponse.next()
		}
		if (!request.cookies.has("token")) {
			return NextResponse.redirect(request.nextUrl.origin)
		}
		return response
	}

	//public pages
	if (request.nextUrl.pathname.startsWith("/about")) {
		if (!response) {
			response = NextResponse.next()
		}
		return response
	}

	// if (request.nextUrl.pathname === "/") {
	// 	if (!response) {
	// 		response = NextResponse.next()
	// 	}
	// 	return response
	// }

	//delete token from cookies
	if (request.nextUrl.pathname.startsWith("/logout")) {
		await logout()
		if (!response) {
			response = NextResponse.next()
		}
		return response
	}

	//set token from query string
	if (request.nextUrl.pathname === "/login") {
		if (!response) {
			response = NextResponse.next()
		}
		if (request.nextUrl.searchParams.has("token")) {
			await login(response, request.nextUrl.searchParams.get("token"))
		}
		return response
	}
}

// export const config = {
// 	matcher: ["/", "/about", "/login", "/logout", "/wiped", "/offer", "/mine", "/crap"]
// }
