import {getSession} from "../actions"
import Image from "next/image"
import SearchBar from "../components/SearchBar"

export default async function Crap({searchParams}) {

	try {
		const session = await getSession()
		const token = session?.value
		const keyword = searchParams.keyword
		const distance = searchParams.distance

		const response = await fetch(`${process.env.ROOT_URL}/api/crap?keyword=${keyword}&token=${token}&distance=${distance}`, {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		})

		if (response.ok) {
			const data = await response.json()

			return (
				<>
					<SearchBar />

					{data.length === 0 && (
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

					{data.length > 0 && (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
							{data.map((item, index) => (
								<div key={index} className="flex flex-col border-2 border-black rounded-md gap-3">
									{item.images.map((imageUrl, imageIndex) => (
										<div key={imageIndex}>
											<Image src={imageUrl} alt={item.description} width={500} height={500} />
										</div>
									))}
									<div className="p-2">
										<div className="flex justify-between pb-4 items-center">
											<p className="font-bold">{item.title}</p>
											<p className="text-normal bg-green-300 w-fit rounded-xl px-2">{item.status}</p>
										</div>
										<p className="italic">{item.description}</p>
										<p>{item.owner.name}</p>
									</div>
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
