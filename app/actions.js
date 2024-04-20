"use server"

import {cookies} from "next/headers"
import {NextResponse} from "next/server"
import {redirect} from "next/navigation"

//set the token in cookies from the query string
export async function login(response, token) {
	const expires = new Date(Date.now() + 100000 * 1000)
	await response.cookies.set("token", token, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		expires: expires
	})
}

export async function decodeToken() {
	const session = await getSession()
	const token = session?.value
	const base64Url = token.split(".")[1]
	const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
	const jsonPayload = JSON.parse(decodeURIComponent(atob(base64)))
	const userId = jsonPayload.id

	return userId
}


//get the form data and send it to the server
export async function getFormData(formData) {
	"use server"

	const title = formData.get("title")
	const description = formData.get("description")
	const image = formData.get("images")
	const lat = process.env.LAT
	const long = process.env.LONG

	const payload = new FormData()

	payload.append("title", title)
	payload.append("description", description)
	payload.append("images", image)
	payload.append("location[type]", "Point")
	payload.append("location[coordinates][]", lat)
	payload.append("location[coordinates][]", long)

	let session = await getSession()
	let token = session?.value

	const response = await fetch(`${process.env.ROOT_URL}/api/crap?token=${token}`, {
		method: "POST",
		headers: {
			"Accept": "application/json"
		},
		body: payload
	})

	if (response.ok) {
		const data = await response.json()

		if (response.status === 201) {
			console.log(data)
			redirect(`/crap/${data.data._id}`)
		}
	} else {
		return (
			<div className="flex flex-col pt-48">
				<p className="font-bold text-xl text-red-600 text-center">Something went wrong: {error}</p>
				<p className="text-center py-1">If you think this is a mistake, please try again later.</p>
			</div>
		)
	}
}

//delete token from cookies
export async function logout() {
	await cookies().delete("token")
}

//get the token from cookies
export async function getSession() {
	const token = await cookies().get("token")
	if (!token) return null
	// revalidatePath('/');
	return token
}

export async function updateSession(request) {
	//refresh the cookie expiry because we navigated
	const token = request.cookies.get("token")?.value
	//if we needed to extract a new token from search or headers we could do that here

	if (!token) return

	// Refresh the session cookie so it doesn't expire
	const expires = new Date(Date.now() + 100000 * 1000)
	const resp = NextResponse.next()
	resp.cookies.set({
		name: "token",
		value: token,
		httpOnly: true,
		expires: expires
	})
	return resp
}
