import {getSession} from "../actions"
import Image from "next/image"
import SearchBar from "../components/SearchBar"

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
				<>
					<SearchBar />

					<div className="flex flex-col items-center justify-center pt-16">
						<div className="flex gap-1">
							<p className="font-bold text-xl text-red-600 text-center">No items found for</p>
							<p className="text-xl text-red-600 text-center font-bold italic">&quot;{keyword}&quot;</p>
						</div>
						<p className="text-center py-3">If you think this is a mistake, please, try again later.</p>

						<Image src="/404-page-not-found.svg" alt="404 Error Image" width={500} height={500} className="py-4" />
					</div>
				</>
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
		console.log(JSON.stringify({ERROR: "Unauthorized. Please, log in."}))
		return (
			<div>
				<h1>Unauthorized</h1>
				<p>Please, log in.</p>
			</div>
		)
	} else {
		console.error(JSON.stringify({ERROR: "Something went wrong"}))
		return (
			<div>
				<h1>Something went wrong</h1>
				<p>Try again later.</p>
			</div>
		)
	}
}
