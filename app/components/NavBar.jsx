import Link from "next/link"
import {getSession} from "../actions"

export default async function NavBar() {
	let token = await getSession()

	return (
		<div>
			{token?.value && (
				<ul className="flex gap-4">
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/about">About</Link>
					</li>
					<li>
						<Link href="/offer">Offer Crap</Link>
					</li>
					<li>
						<Link href="/wiped">Wiped</Link>
					</li>
				</ul>
			)}
			{!token?.value && (
				<ul className="flex gap-4">
					<li className="text-black bg-purple-100">
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/about">About</Link>
					</li>
				</ul>
			)}
		</div>
	)
}
