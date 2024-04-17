import Image from "next/image"

export default function GoogleSignInButton() {
	return (
		<button className="flex items-center font-semibold justify-center px-6 py-2 text-xl transition-colors duration-300 bg-white border-2 border-black rounded-lg focus:shadow-outline hover:bg-slate-200 mt-4 text-black">
			<Image src="/google.png" alt="Google Logo" width={20} height={20} />
			<div className="flex gap-1">
				<p className="pl-2">Sign in</p>
				<p className="font-semibold">with Google</p>
			</div>
		</button>
	)
}
