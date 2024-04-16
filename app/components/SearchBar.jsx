"use client"

import {useState} from "react"
import {useRouter} from "next/navigation"

export default function SearchBar() {
	const [search, setSearch] = useState("")
	const router = useRouter()

	console.log(search)
	const handleSubmit = ev => {
		ev.preventDefault()
		router.push(`/crap?keyword=${search}`)
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="search">Search for an item</label>
			<input
				type="text"
				name="search"
				id="search"
				placeholder="New Search"
				value={search}
				onChange={e => {
					setSearch(e.target.value)
				}}
			/>
			<button type="submit">Search</button>
		</form>
	)
}
