import mongoose from "mongoose";

const DB_URI = process.env.DATABASE_URI!; // guarantee its presence
const DB_NAME = process.env.DATABASE_NAME;

let isConnected = false;

export const connectToDB = async () => {
	if (isConnected) {
		console.log(
			`DB already connected, so using existing instance : ${mongoose.connection.name}`
		);
		return mongoose.connection;
	}

	try {
		const mongooseInstance = await mongoose.connect(DB_URI, {
			dbName: DB_NAME,
		});

		console.log(`Successfully connected to MongoDB 📦!!!, ${mongoose.connection.name}`);
		// console.log(`Mongoose Instance : ${mongooseInstance}`);

		isConnected = true;
		return mongoose.connection;
	} catch (error) {
		console.log(`Error connecting to DB, ERROR:${error}`);
		isConnected = false;
		process.exit(1);
	}
};
