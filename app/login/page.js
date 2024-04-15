import {redirect} from "next/navigation"

export default function Login() {
	//redirecting from here back to the home page
	//allows for the cookies to be set and read in the headers for the home page.
	redirect("/")
}
