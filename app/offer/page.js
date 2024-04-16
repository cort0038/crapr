// "use client"
// import {handleForm} from "../actions"
import {getSession} from "../actions"

export default async function Offer() {
	let session = await getSession()
	let token = session?.value

	const response = await fetch(`${process.env.ROOT_URL}/api/crap?token=${token}`, {
		method: "POST",
		headers: {
			"Accept": "application/json"
		}
	})

	if (response.status === 201) {
		let data = await response.json()
		console.log(data)
	} else if (response.status === 401) {
		console.warn("Unauthorized. Please, log in.")
	} else {
		console.error("Something went wrong")
	}

	return (
		<form id="myform">
			<div className="flex gap-3">
				<label>Title</label>
				<input type="text" name="title" placeholder="title" className="border-2 border-black" />
			</div>
			<button name="button">Submit</button>
		</form>
	)
}
