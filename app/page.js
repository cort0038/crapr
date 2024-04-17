import {getSession, logout} from "./actions"
import {redirect} from "next/navigation"
import SearchBar from "./components/SearchBar"
import GoogleSignInButton from "./components/GoogleSignInButton"

export default async function Home() {
	const redirectUrl = `${process.env.ROOT_URL}/login`
	const url = `${process.env.GOOGLE_CALLBACK_URL}=${redirectUrl}`

	let token = await getSession()

	return (
		<div>
			{!token?.value && (
				<div>
					<form className="flex items-center justify-center"
						action={async () => {
							"use server"
							redirect(url)
						}}>
						<GoogleSignInButton />
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
