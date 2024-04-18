"use client"
import {FaSearch} from "react-icons/fa"
import {useState} from "react"
import {useRouter} from "next/navigation"

export default function SearchBar() {
	const [search, setSearch] = useState("")
	const router = useRouter()

	const handleSubmit = ev => {
		ev.preventDefault()
		router.push(`/crap?keyword=${search}`)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col p-2 items-center justify-center mt-12 mb-4 rounded-lg text-black">
			<label htmlFor="search" className="font-semibold"></label>
			<div className="flex items-center border-zinc-500 px-4 w-full border rounded-full py-2 justify-center gap-4">
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
					required
				/>
				<FaSearch className="text-xl cursor-pointer" onClick={handleSubmit} />
			</div>
		</form>
	)
}
