"use client"

import {useSession} from "next-auth/react"
import {useState} from "react"
import {useRouter} from "next/navigation"

export default function SearchBar() {
	const [search, setSearch] = useState("")
	const router = useRouter()
	const {status} = useSession()

	const handleSubmit = ev => {
		ev.preventDefault()
		router.push(`/crap?keyword=${search}`)
	}

	if (status === "authenticated") {
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
	} else {
		return <p>Sign in to start selling/buying</p>
	}
}
