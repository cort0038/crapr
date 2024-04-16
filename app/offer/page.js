export default async function Offer() {
	const response = await fetch(`http://localhost:3000/api/crap`, {
		method: "POST"
	})

	return (
		<form>
			<div className="flex gap-3">
				<label>Title</label>
				<input type="text" name="title" placeholder="title" className="border-2 border-black" />
			</div>
			<div>
				<label>Description</label>
				<textarea name="description" placeholder="description" className="border-2 border-black"></textarea>
			</div>
			<div>
				<label>Image</label>
				<input type="file" name="image" className="border-2 border-black" />
			</div>
			<button>Submit</button>
		</form>
	)
}
