"use client"
import GoogleSignInButton from "./GoogleSignInButton"
import {useSession} from "next-auth/react"
import Image from "next/image"

export default function UserInfo() {
	const {status, data: session} = useSession()
	if (status === "authenticated") {
		return (
			<div>
				<Image
					src={session?.session?.user?.image}
					width={60}
					height={60}
					alt="Profile Image"
					className="rounded-full"
				/>
				<h1>Welcome, {session.session.user.name}!</h1>
			</div>
		)
	} else {
		return (
			<div>
				<GoogleSignInButton />
			</div>
		)
	}
}
