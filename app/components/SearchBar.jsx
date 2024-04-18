"use client"
import {FaSearch} from "react-icons/fa"
import {useState} from "react"
import {useRouter} from "next/navigation"

export default function SearchBar() {
	const [search, setSearch] = useState("")
	const [distance, setDistance] = useState("")
	const router = useRouter()

	function selectDistance(e) {
		setDistance(e.target.value)
	}

	const handleSubmit = ev => {
		ev.preventDefault()
		router.push(`/crap?keyword=${search}&distance=${distance}`)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col p-2 items-center justify-center mt-12 mb-4 rounded-lg text-black">
			<label htmlFor="search" className="font-semibold"></label>

			<label htmlFor="search" className="font-semibold"></label>
			<div className="flex items-center border-zinc-500 px-4 w-full md:w-1/2 border rounded-full py-2 justify-center gap-4">
				<input
					className="text-lg text-center  focus:outline-none placeholder-gray-500 focus:placeholder-opacity-0 w-full"
					type="text"
					name="search"
					id="search"
					placeholder="Search for an item"
					value={search}
					onChange={e => {
						setSearch(e.target.value)
					}}
				/>
				<FaSearch className="text-xl cursor-pointer" onClick={handleSubmit} />
			</div>

			<div className="flex gap-5 items-center justify-center mt-5">
				<p className="font-bold">Within</p>
				<div className="flex gap-2">
					<input
						name="distance"
						type="radio"
						checked={distance === "100000"}
						value="100000"
						onChange={selectDistance}
						className="pt-4 justify-center items-center flex border-2 border-black"
					/>
					<label>10km</label>
				</div>
				<div className="flex gap-2">
					<input
						name="distance"
						type="radio"
						checked={distance === "300000"}
						value="300000"
						onChange={selectDistance}
						className="pt-4 justify-center items-center flex border-2 border-black"
					/>
					<label>30km</label>
				</div>
				<div className="flex gap-2">
					<input
						name="distance"
						type="radio"
						checked={distance === "700000"}
						value="700000"
						onChange={selectDistance}
						className="pt-4 justify-center items-center flex border-2 border-black"
					/>
					<label>70km</label>
				</div>
			</div>
		</form>
	)
}
