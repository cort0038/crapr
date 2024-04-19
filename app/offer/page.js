import {getFormData} from "../actions"

export default async function Offer() {
	try {
		return (
			<form id="myform" action={getFormData}>
				<div className="flex gap-3">
					<label>Title</label>
					<input type="text" name="title" placeholder="title" className="border-2 border-black" required />
				</div>
				<div className="flex gap-3">
					<label>Description</label>
					<input
						type="text"
						name="description"
						placeholder="Description"
						className="border-2 border-black"
						required
					/>
				</div>
				<div className="flex gap-3">
					<label>Image</label>
					<input
						name="images"
						accept="image/*"
						id="imageUpload"
						type="file"
						className="border-2 border-black"
						required
					/>
				</div>
				<button name="button">Submit</button>
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
