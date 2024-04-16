import {getSession, logout} from "./actions"
import {redirect} from "next/navigation"
import SearchBar from "./components/SearchBar"

export default async function Home() {
	const redirectUrl = "http://localhost:3000/login"
	const url = `http://localhost:4000/auth/google?redirect_url=${redirectUrl}`
	let token = await getSession()

	return (
		<div>
			{!token?.value && (
				<div>
					<form
						action={async () => {
							"use server"
							redirect(url)
						}}>
						<button>Sign in</button>
					</form>
				</div>
			)}

			{token?.value && (
				<div>
					<SearchBar />
					<form
						action={async () => {
							"use server"
							await logout()
							redirect("/")
						}}>
						<button>Sign out</button>
					</form>
				</div>
			)}
		</div>
	)
}
