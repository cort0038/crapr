export async function GET(request) {
	let token = request.nextUrl.searchParams.get("token")
	let keyword = request.nextUrl.searchParams.get("keyword")
	let url = `http://localhost:4000/api/crap?keyword=${keyword}`

	// console.log(request)

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Accept": "application/json",
			"Authorization": `Bearer ${token}`
		},
		next: {revalidate: 60}
	})
	return response
}

export async function POST(request) {
	let token = request.nextUrl.searchParams.get("token")
	// let keyword = request.nextUrl.searchParams.get("keyword")
	let url = "http://localhost:4000/api/crap"

	const lat = request.geo.latitude ?? process.env.lat
	const lon = request.geo.longitude ?? process.env.lon

	// console.log(request)

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: FormData({lat, lon}),
		next: {revalidate: 60}
	})
	return response
}
