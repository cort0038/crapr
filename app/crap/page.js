import {getSession} from "../actions"
import Image from "next/image"
import SearchBar from "../components/SearchBar"

export default async function Crap({params, searchParams}) {
	let session = await getSession()
	let token = session?.value
	let keyword = searchParams.keyword

	try {
		const response = await fetch(`${process.env.ROOT_URL}/api/crap?keyword=${keyword}&token=${token}`, {
			method: "GET",
			headers: {
				"Accept": "application/json"
			}
		})

		if (response.status === 200) {
			let data = await response.json()

			return (
				<>
					<SearchBar />

					{data && data.length === 0 && (
						<div className="flex flex-col items-center justify-center pt-16">
							<div className="flex gap-1">
								<p className="font-bold text-xl text-red-600 text-center">No items found for</p>
								<p className="text-xl text-red-600 text-center font-bold italic">&quot;{keyword}&quot;</p>
							</div>
							<p className="text-center py-3">If you think this is a mistake, please try again later.</p>

							<Image
								src="/404-page-not-found.svg"
								alt="404 Error Image"
								width={500}
								height={500}
								className="py-4"
							/>
						</div>
					)}

					{data && data.length > 0 && (
						<div>
							{data.map((item, index) => (
								<div key={index}>
									<h2>{item.title}</h2>
									<p>{item.description}</p>
									{item.images.map((imageUrl, imageIndex) => (
										<div key={imageIndex}>
											<Image src={imageUrl} alt={item.description} width={500} height={500} />
										</div>
									))}
									<p>{item.status}</p>
									<p>{item.owner.name}</p>
								</div>
							))}
						</div>
					)}
				</>
			)
		} else {
			return (
				<>
					<SearchBar />
					<div className="flex flex-col justify-center items-center py-32 text-xl">
						<h1 className="font-bold italic text-red-800">Something went wrong</h1>
						<p>Try again later.</p>
					</div>
				</>
			)
		}
	} catch (error) {
		console.error(error)
		return (
			<div>
				<h1>Something went wrong</h1>
				<p>Try again later.</p>
			</div>
		)
	}
}
