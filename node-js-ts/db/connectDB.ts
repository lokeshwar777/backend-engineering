import mongoose from "mongoose";
import { DATABASE_NAME, MONGODB_URI } from "../constants/index.js";

const DBConnection: GlobalMongoose = global.mongoose ?? {
	conn: null,
	promise: null,
};
global.mongoose = DBConnection;

export const connectToDB = async (): Promise<typeof mongoose> => {
	console.log("Connecting to DB ...");

	// check for cached connection instance
	if (DBConnection.conn) {
		console.log(
			`cached DB exists, so using existing it! \nDatabase name : ${DBConnection.conn.connection.name}`,
		);
		return DBConnection.conn;
	}

	// store a new connection in the promise (if not present)
	if (!DBConnection.promise) {
		// guarantee URI presence
		const bufferedConnection = mongoose.connect(MONGODB_URI!, {
			dbName: DATABASE_NAME,
			bufferCommands: false,
		});
		DBConnection.promise = bufferedConnection;
	}

	try {
		DBConnection.conn = await DBConnection.promise;
		console.log(
			`Successfully connected to MongoDB 📦!!! \nDatabase name : ${DBConnection.conn.connection.name}`,
		);

		return DBConnection.conn;
	} catch (error) {
		console.log(`Error connecting to DB, ERROR:${error}`);
		DBConnection.conn = null;
		DBConnection.promise = null;
		throw error;
	}
};
