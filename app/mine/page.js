import {getSession} from "../actions"
import Image from "next/image"
import SearchBar from "../components/SearchBar"
import Wishlist from "../components/Wishlist"

export default async function Mine() {
	try {
		const session = await getSession()
		const token = session?.value

		const responseMine = await fetch(`${process.env.ROOT_URL}/api/mine?token=${token}`, {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		})

		let mine = await responseMine.json()

		if (responseMine.ok) {
			return (
				<>
					<SearchBar />
					<p className="mt-6 flex items-center justify-center text-xl font-bold border-y-2 bg-slate-100 rounded-md my-4">
						Your Items
					</p>
					{mine.data.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-16">
							<div className="flex gap-1">
								<p className="font-bold text-xl text-red-600 text-center">You have not post anything yet.</p>
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
					) : (
						<>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
								{mine.data.map((item, index) => (
									<a
										key={index}
										className="flex flex-col border-2 border-black rounded-md gap-3 cursor-pointer"
										href={`${process.env.ROOT_URL}/crap/${item._id}`}>
										{item.images.map((imageUrl, imageIndex) => (
											<div key={imageIndex}>
												<Image src={imageUrl} alt={item.description} width={500} height={500} />
											</div>
										))}
										<div className="p-2">
											<div className="flex justify-between pb-4 items-center">
												<p className="font-bold">{item.title}</p>
												<p
													className={`text-normal ${
														item.status === "Interested"
															? "bg-blue-300"
															: item.status === "Flushed"
															? "bg-red-300"
															: item.status === "Scheduled"
															? "bg-orange-300"
															: item.status === "Agreed"
															? "bg-yellow-300"
															: "bg-green-300"
													} w-fit rounded-xl px-2`}>
													{item.status}
												</p>
												{/* <p className="text-normal bg-green-300 w-fit rounded-xl px-2">{item.status}</p> */}
											</div>
											<p className="italic">{item.description}</p>
											<p>{item.owner.name}</p>
										</div>
									</a>
								))}
							</div>
							<Wishlist />
						</>
					)}
				</>
			)
		}
	} catch (error) {
		return (
			<>
				<SearchBar />
				<div className="flex flex-col pt-48">
					<p className="font-bold text-xl text-red-600 text-center">Something went wrong</p>
					<p className="text-center py-1">If you think this is a mistake, please try again later.</p>
				</div>
			</>
		)
	}
}
