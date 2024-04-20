import {getSession} from "@/app/actions"
import Image from "next/image"
import {decodeToken} from "@/app/actions"
import {revalidatePath} from "next/cache"

export default async function crapId(params) {
	try {
		const session = await getSession()
		const token = session?.value
		const userId = await decodeToken()

		async function showInterest() {
			"use server"
			const url2 = `${process.env.API_URL}/api/crap/${params.params.id}/interested`

			const postResponse = await fetch(url2, {
				method: "PATCH",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					status: "Interested"
				}),
				next: {revalidate: 60}
			})

			if (postResponse.ok) {
				const postData = await postResponse.json()
				const crapId = postData._id

				if (postResponse.status === 200) {
					revalidatePath(`/crap/${crapId}`)
				}
			}
		}

		const url = `${process.env.API_URL}/api/crap/${params.params.id}`
		const getResponse = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`
			}
		})

		if (getResponse.ok) {
			const data = await getResponse.json()

			return (
				<>
					{data && data.data.status === "Interested" && data.data.owner._id === userId && (
						<>
							<div className="flex items-center flex-col md:flex-row justify-center py-16 gap-12">
								<a className="flex flex-col border-2 border-black rounded-md gap-3">
									<Image
										src={data.data.images[0]}
										alt={data.data.description}
										width={500}
										height={500}
										className="aspect-video object-cover"
									/>

									<div className="p-2">
										<div className="flex justify-between pb-4 items-center">
											<p className="font-bold">{data.data.title}</p>
											<p
												className={`text-normal ${
													data.data.status === "Interested"
														? "bg-blue-300"
														: data.data.status === "Flushed"
														? "bg-red-300"
														: data.data.status === "Scheduled"
														? "bg-orange-300"
														: data.data.status === "Agreed"
														? "bg-yellow-300"
														: "bg-green-300"
												} w-fit rounded-xl px-2`}>
												{data.data.status}
											</p>
										</div>
										<div className="border-b-2 pt-2">
											<p className="font-bold">Description</p>
											<p className="italic">{data.data.description}</p>
										</div>
										<div className="flex flex-col pt-2">
											<p className="font-bold">Buyer:</p>
											<p>{data.data.buyer.name}</p>
										</div>
									</div>
									{userId === data.data.owner._id && (
										<div className="flex justify-center py-2">
											<form>
												<button className="bg-red-600 text-white rounded-md px-3 py-1">Delete</button>
											</form>
										</div>
									)}
								</a>

								<form className="flex flex-col items-center justify-center pt-8 gap-2 bg-slate-200 rounded-xl p-6 w-full md:w-1/2">
									<p className="font-bold">Set your suggestions to meet:</p>
									<div className="flex flex-col w-full gap-1 text-center">
										<label className="font-bold">Date</label>
										<input type="date" className="block w-full text-center border-2 border-black p-1 rounded-lg" />
									</div>
									<div className="flex flex-col w-full gap-1 text-center">
										<label className="font-bold">Time</label>
										<input type="time" className="block w-full text-center border-2 border-black p-1 rounded-lg" />
									</div>
									<div className="flex flex-col w-full gap-1 text-center">
										<label className="font-bold">Address</label>
										<textarea
											type="text"
											className="block w-full text-center border-2 border-black p-1 rounded-lg"
										/>
									</div>

									<button className="bg-blue-600 text-white p-2 rounded-lg font-bold mt-4 w-1/2">Submit</button>
								</form>
							</div>
						</>
					)}

					{data && data.data.status === "Interested" && data.data.buyer._id === userId && (
						<>
							<div className="flex items-center justify-center py-16 flex-col md:flex-row gap-12">
								<a className="flex flex-col border-2 border-black rounded-md gap-3">
									<Image
										src={data.data.images[0]}
										alt={data.data.description}
										width={500}
										height={500}
										className="aspect-video object-cover"
									/>

									<div className="p-2">
										<div className="flex justify-between pb-4 items-center">
											<p className="font-bold">{data.data.title}</p>
											<p
												className={`text-normal ${
													data.data.status === "Interested"
														? "bg-blue-300"
														: data.data.status === "Flushed"
														? "bg-red-300"
														: data.data.status === "Scheduled"
														? "bg-orange-300"
														: data.data.status === "Agreed"
														? "bg-yellow-300"
														: "bg-green-300"
												} w-fit rounded-xl px-2`}>
												{data.data.status}
											</p>
										</div>
										<div className="border-b-2 pt-2">
											<p className="font-bold">Description</p>
											<p className="italic">{data.data.description}</p>
										</div>
										<div className="flex flex-col pt-2">
											<p className="font-bold">Buyer:</p>
											<p>{data.data.buyer.name}</p>
										</div>
									</div>
									{userId === data.data.owner._id && (
										<div className="flex justify-center py-2">
											<form>
												<button className="bg-red-600 text-white rounded-md px-3 py-1">Delete</button>
											</form>
										</div>
									)}
								</a>

								<p className="text-xl font-bold">Waiting for details from seller...</p>
							</div>
						</>
					)}

					{data && data.data.status === "Available" && (
						<>
							<div className="flex items-center justify-center py-16 gap-12">
								<a className="flex flex-col border-2 border-black rounded-md gap-3">
									<Image
										src={data.data.images[0]}
										alt={data.data.description}
										width={500}
										height={500}
										className="aspect-video object-cover"
									/>

									<div className="p-2">
										<div className="flex justify-between pb-4 items-center">
											<p className="font-bold">{data.data.title}</p>
											<p
												className={`text-normal ${
													data.data.status === "Interested"
														? "bg-blue-300"
														: data.data.status === "Flushed"
														? "bg-red-300"
														: data.data.status === "Scheduled"
														? "bg-orange-300"
														: data.data.status === "Agreed"
														? "bg-yellow-300"
														: "bg-green-300"
												} w-fit rounded-xl px-2`}>
												{data.data.status}
											</p>
										</div>
										<div className="border-b-2 pt-2">
											<p className="font-bold">Description</p>
											<p className="italic">{data.data.description}</p>
										</div>
										<div className="flex flex-col pt-2">
											<p className="font-bold">Owner:</p>
											<p>{data.data.buyer ? data.data.buyer.name : ""}</p>
										</div>
									</div>

									{userId === data.data.owner._id && (
										<div className="flex justify-center py-2">
											<button className="bg-red-600 text-white rounded-md px-3 py-1">Delete</button>
										</div>
									)}
									{userId !== data.data.owner._id && data.data.status === "Available" && (
										<div className="flex justify-center py-2">
											<form action={showInterest}>
												<button className="bg-blue-600 text-white rounded-md px-3 py-1">I am interested</button>
											</form>
										</div>
									)}
								</a>
							</div>
						</>
					)}
				</>
			)
		}
	} catch (error) {
		return (
			<>
				<div className="flex flex-col pt-48">
					<p className="font-bold text-xl text-red-600 text-center">Something went wrong: {error}</p>
					<p className="text-center py-1">If you think this is a mistake, please try again later.</p>
				</div>
			</>
		)
	}
}
