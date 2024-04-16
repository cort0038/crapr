import {getSession} from "../actions"
export default async function Crap({params, searchParams}) {
	let session = await getSession()
	let token = session?.value
	let keyword = searchParams.keyword

	const response = await fetch(`http://localhost:3000/api/crap?keyword=${keyword}&token=${token}`, {
		method: "GET",
		headers: {
			"Accept": "application/json"
		}
	})

	let data = await response.json()
	console.log(data)

	return (
		<div>
			<h1>Crap</h1>
			<p>{JSON.stringify(data)}</p>
		</div>
	)
}
