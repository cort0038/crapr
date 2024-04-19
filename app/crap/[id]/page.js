import {getSession} from "@/app/actions"
import Image from "next/image"

export default async function crapId(params) {
	const session = await getSession()
	const token = session?.value

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
		console.log("data", data)
		return (
			<>
				{data && (
					<>
						<div className="flex flex-col items-center justify-center pt-16">
							<a className="flex flex-col border-2 border-black rounded-md gap-3 cursor-pointer">
								<Image src={data.data.images[0]} alt={data.data.description} width={500} height={500} />

								<div className="p-2">
									<div className="flex justify-between pb-4 items-center">
										<p className="font-bold">{data.data.title}</p>
										<p className="text-normal bg-green-300 w-fit rounded-xl px-2">{data.data.status}</p>
									</div>
									<p className="italic">{data.data.description}</p>
									<p>{data.data.owner.name}</p>
								</div>
							</a>
						</div>
					</>
				)}
			</>
		)
	} else {
		console.log("error", response)
	}
}
