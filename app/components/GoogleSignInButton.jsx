"use client"

// import {signIn} from "next-auth/react"

export default function GoogleSignInButton() {

	return (
		<button
			className="w-full flex items-center font-semibold justify-center h-14 text-xl transition-colors duration-300 bg-white border-2 border-black rounded-lg focus:shadow-outline hover:bg-slate-200 px-6 mt-4 text-black"
			onClick={signIn}>
			Sign in with Google
		</button>
	)
}
