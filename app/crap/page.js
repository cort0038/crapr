import {getSession} from "../actions"

export default async function Crap({params, searchParams}) {
	let session = await getSession()
	let token = session?.value
	let keyword = searchParams.keyword

	const response = await fetch(`${process.env.ROOT_URL}/api/crap?keyword=${keyword}&token=${token}`, {
		method: "GET",
		headers: {
			"Accept": "application/json"
		}
	})

	if (response.status === 200) {
		let data = await response.json()
		if (data.length === 0) {
			return (
				<div>
					<h1>No data found</h1>
				</div>
			)
		} else {
			return (
				<div>
					<h1>Crap</h1>
					<p>{JSON.stringify(data)}</p>
				</div>
			)
		}
	} else if (response.status === 401) {
		console.warn("Unauthorized. Please, log in.")
		return (
			<div>
				<h1>Unauthorized</h1>
				<p>Please, log in.</p>
			</div>
		)
	} else {
		console.error("Something went wrong")
		return (
			<div>
				<h1>Something went wrong</h1>
				<p>Try again later.</p>
			</div>
		)
	}
}
