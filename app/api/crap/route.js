export async function GET(request) {
	try {
		const token = request.nextUrl.searchParams.get("token")
		const keyword = request.nextUrl.searchParams.get("keyword")
		const lat = request.geo.latitude ?? process.env.LAT
		const long = request.geo.longitude ?? process.env.LONG
		const distance = request.nextUrl.searchParams.get("distance")

		let url = `${process.env.API_URL}/api/crap?keyword=${keyword}&distance=${distance}&lat=${lat}&long=${long}`

		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Accept": "application/json",
				"Authorization": `Bearer ${token}`
			},
			next: {revalidate: 60}
		})

		if (response.status === 200) {
			let data = await response.json()
			return new Response(JSON.stringify(data), {
				status: 200,
				headers: {
					"Content-Type": "application/json"
				}
			})
		} else if (response.status === 401) {
			return new Response(JSON.stringify({error: "Unauthorized. Please, log in."}), {
				status: 401,
				headers: {
					"Content-Type": "application/json"
				}
			})
		} else {
			throw new Error("Request failed with status " + response.status)
		}
	} catch (error) {
		return new Response(JSON.stringify({error: "Something went wrong"}), {
			status: 500,
			headers: {
				"Content-Type": "application/json"
			}
		})
	}
}

export async function POST(request) {
	let formData = await request.formData()

	let url = `${process.env.API_URL}/api/crap`
	let token = request.nextUrl.searchParams.get("token")

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${token}`
			},
			body: formData
		})

		if (response.status === 201) {
			let data = await response.json()
			return new Response(JSON.stringify(data), {
				status: 201,
				headers: {
					"Content-Type": "application/json"
				}
			})
		} else if (response.status === 401) {
			return new Response(JSON.stringify({error: "Unauthorized. Please, log in."}), {
				status: 401,
				headers: {
					"Content-Type": "application/json"
				}
			})
		} else {
			throw new Error("Request failed with status " + response.status)
		}
	} catch (error) {
		return new Response(JSON.stringify({error: "Something went wrong"}), {
			status: 500,
			headers: {
				"Content-Type": "application/json"
			}
		})
	}
}


