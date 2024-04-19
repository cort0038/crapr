import {getSession} from "@/app/actions"
import Image from "next/image"
import {decodeToken} from "@/app/actions"

export default async function crapId(params) {
	try {
		const session = await getSession()
		const token = session?.value
		const userId = await decodeToken()

		const url = `${process.env.API_URL}/api/crap/${params.params.id}`
		const response = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`
			}
		})

		if (response.ok) {
			const data = await response.json()

			return (
				<>
					{data && data.data.status === "Interested" && (
						<>
							<div className="flex items-center justify-center pt-16 gap-12">
								<a className="flex flex-col border-2 border-black rounded-md gap-3">
									<Image src={data.data.images[0]} alt={data.data.description} width={500} height={500} />

									<div className="p-2">
										<div className="flex justify-between pb-4 items-center">
											<p className="font-bold">{data.data.title}</p>
											<p>{data.data.status}</p>
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
											<form action={await deleteCrap(params.params.id)}>
												<button className="bg-red-600 text-white rounded-md px-3 py-1">Delete</button>
											</form>
										</div>
									)}
								</a>

								<form className="flex flex-col pt-8 gap-2">
									<p className="font-bold">Set your suggestions to meet:</p>
									<div className="flex items-center gap-4">
										<label className="font-bold">Date</label>
										<input type="date" className="border-2 border-slate-700 rounded-lg px-2 w-full" />
									</div>
									<div className="flex items-center gap-4">
										<label className="font-bold">Time</label>
										<input type="time" className="border-2 border-slate-700 rounded-lg px-2 w-full" />
									</div>
									<div className="border-1 border-black rounded-lg">
										<textarea
											type="text"
											placeholder="Address"
											className="border-2 border-slate-700 rounded-lg px-2 w-full"
										/>
									</div>

									<button className="bg-blue-600 text-white rounded-md px-3 py-1">Submit</button>
								</form>
							</div>
						</>
					)}

					{data && data.data.status === "Available" && (
						<>
							<div className="flex items-center justify-center pt-16 gap-12">
								<a className="flex flex-col border-2 border-black rounded-md gap-3">
									<Image src={data.data.images[0]} alt={data.data.description} width={500} height={500} />

									<div className="p-2">
										<div className="flex justify-between pb-4 items-center">
											<p className="font-bold">{data.data.title}</p>
											<p className="text-normal bg-green-300 w-fit rounded-xl px-2">{data.data.status}</p>
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
											<form>
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
