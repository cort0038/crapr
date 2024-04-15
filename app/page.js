import {getSession} from "./actions"
import {logout} from "./actions"
import {redirect} from "next/navigation"

export default async function Home() {
	const redirectUrl = "http://localhost:3000/login"
	const url = `https://crapr-api.onrender.com/auth/google?redirect_url=${redirectUrl}`
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
