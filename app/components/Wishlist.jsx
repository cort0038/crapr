import {getSession} from "../actions"
import Image from "next/image"

export default async function Wishlist() {
	const session = await getSession()
	const token = session?.value

	const responseInterested = await fetch(`${process.env.ROOT_URL}/api/interested?token=${token}`, {
		method: "GET",
		headers: {
			Accept: "application/json"
		}
	})

	let interested = await responseInterested.json()

	if (responseInterested.ok) {
		;<p className="mt-6 flex items-center justify-center text-xl font-bold border-y-2 bg-slate-100 rounded-md">
			Wishlist
		</p>
		return (
			<>
				<p className="mt-6 flex items-center justify-center text-xl font-bold border-y-2 bg-slate-100 rounded-md">
					Wishlist
				</p>
				{interested.data.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-16">
						<div className="flex gap-1">
							<p className="font-bold text-xl text-red-600 text-center">
								You have not shown interested in any item.
							</p>
						</div>
						<p className="text-center py-3">If you think this is a mistake, please try again later.</p>
					</div>
				) : (
					<>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-6">
							{interested.data.map((item, index) => (
								<a
									key={index}
									className="flex flex-col border-2 border-black rounded-md gap-3 cursor-pointer"
									href={`${process.env.ROOT_URL}/crap/${item._id}`}>
									{item.images.map((imageUrl, imageIndex) => (
										<div key={imageIndex}>
											<Image
												src={imageUrl}
												alt={item.description}
												width={500}
												height={500}
												className="aspect-video object-cover"
											/>
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
										</div>
										<p className="italic">{item.description}</p>
										<p>{item.owner.name}</p>
										<p>WISH LIST</p>
									</div>
								</a>
							))}
						</div>
					</>
				)}
			</>
		)
	}
}
