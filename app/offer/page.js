import {getFormData} from "../actions"

export default async function Offer() {
	try {
		return (
			<form
				id="myform"
				action={getFormData}
				className="flex flex-col items-center justify-center mt-12 md:mt-12 p-6 bg-slate-200 rounded-xl md:w-1/2 mx-auto">
				<div className="flex flex-col w-full gap-1 text-center">
					<label className="font-bold">Title</label>
					<input
						type="text"
						name="title"
						className="block w-full text-center border-2 border-black p-1 rounded-lg"
						required
					/>
				</div>
				<div className="flex flex-col w-full gap-1 text-center">
					<label className="font-bold">Description</label>
					<textarea
						type="text"
						name="description"
						className="block w-full text-center border-2 border-black p-1 rounded-lg"
						required
					/>
				</div>
				<div className="flex w-full flex-col gap-1 text-center">
					<label className="font-bold">Image</label>
					<input
						name="images"
						accept="image/*"
						id="imageUpload"
						type="file"
						className="block w-full bg-white text-center border-2 border-black px-1 rounded-lg"
						required
					/>
				</div>
				<button name="button" className="bg-green-300 p-2 rounded-lg font-bold mt-4 w-1/2">
					Submit
				</button>
			</form>
		)
	} catch (error) {
		return (
			<div className="flex flex-col pt-48">
				<p className="font-bold text-xl text-red-600 text-center">Something went wrong: {error}</p>
				<p className="text-center py-1">If you think this is a mistake, please try again later.</p>
			</div>
		)
	}
}
