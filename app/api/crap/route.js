export async function GET(request) {
	let token = request.nextUrl.searchParams.get("token")
	let keyword = request.nextUrl.searchParams.get("keyword")
	let url = `${process.env.API_URL}/api/crap?keyword=${keyword}`

	try {
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
	let form = {}
	for (const [key, value] of formData.entries()) {
		if (!key.startsWith("$ACTION_ID")) {
			form[key] = value
		}
	}

	let url = `${process.env.API_URL}/api/crap`
	let token = request.nextUrl.searchParams.get("token")

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			}
			// body: JSON.stringify(formData)
			// body: JSON.stringify(form)
			// body: form
			// body: formData
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
