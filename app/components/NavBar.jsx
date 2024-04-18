import Link from "next/link"
import {getSession, logout} from "../actions"
import {redirect} from "next/navigation"

export default async function NavBar() {
	let token = await getSession()

	return (
		<div className="flex justify-end">
			{token?.value && (
				<div className="flex items-center justify-between flex-col md:flex-row w-full pt-8 px-3 md:px-12">
					<a className="font-bold text-3xl" href="/">
						CRAP
					</a>
					<ul className="flex gap-4 py-2 justify-between font-bold md:text-lg items-center">
						<li className="hover:text-green-700 transition-all">
							<Link href="/">Home</Link>
						</li>
						<li className="hover:text-green-700 transition-all">
							<Link href="/about">About</Link>
						</li>
						<li className="hover:text-green-700 transition-all">
							<Link href="/offer">Offer</Link>
						</li>
						<li className="hover:text-green-700 transition-all">
							<Link href="/mine">My Crap</Link>
						</li>
						<li className="hover:text-green-700 transition-all">
							<Link href="/wiped">Wiped</Link>
						</li>
						<li className="hover:text-white hover:bg-black transition-all border-2 border-black rounded-full p-2">
							<form
								action={async () => {
									"use server"
									await logout()
									redirect("/")
								}}>
								<button>Sign out</button>
							</form>
						</li>
					</ul>
				</div>
			)}
			{!token?.value && (
				<div className="flex items-center justify-between flex-col md:flex-row w-full pt-8 px-3 md:px-12">
					<a className="font-bold text-3xl" href="/">
						CRAP
					</a>
					<ul className="flex gap-4 py-2 justify-between font-bold md:text-lg items-center">
						<li className="hover:text-green-700 transition-all">
							<Link href="/">Home</Link>
						</li>
						<li className="hover:text-green-700 transition-all">
							<Link href="/about">About</Link>
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}
