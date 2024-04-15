// import mongoose from "mongoose"
// import {MongoClient} from "mongodb"

// export default async function connectDB() {
// 	try {
// 		await mongoose.connect(
// 			"mongodb+srv://luiscortorrealc:Destiny$2024!.@luis-cluster.4z3zdrd.mongodb.net/crapR?retryWrites=true&w=majority&appName=Luis-Cluster"
// 		)
// 		console.log("MongoDB connected")
// 	} catch (error) {
// 		console.error(error)
// 		process.exit(1)
// 	}
// }

import {MongoClient} from "mongodb"

export async function connectDBUsers() {
	const client = new MongoClient(
		"mongodb+srv://luiscortorrealc:Destiny$2024!.@luis-cluster.4z3zdrd.mongodb.net/?retryWrites=true&w=majority&appName=Luis-Cluster"
	)

	await client.connect()
	console.log("MongoDB connected")
	return client.db("crapR")
}
