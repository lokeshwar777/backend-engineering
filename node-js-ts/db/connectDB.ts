import mongoose from "mongoose";

const DB_URI = process.env.MONGODB_URI!; // guarantee its presence
const DB_NAME = process.env.DATABASE_NAME;

const DBConnection: GlobalMongoose = global.mongoose ?? { conn: null, promise: null };
global.mongoose = DBConnection;

export const connectToDB = async () => {
	console.log("Connecting to DB ...");

	// check for cached connection instance
	if (DBConnection.conn) {
		console.log(
			`cached DB exists, so using existing it! \nDatabase name : ${DBConnection.conn.connection.name}`
		);
		return DBConnection.conn;
	}

	// store a new connection in the promise (if not present)
	if (!DBConnection.promise) {
		const bufferedConnection = mongoose.connect(DB_URI, {
			dbName: DB_NAME,
			bufferCommands: false,
		});
		DBConnection.promise = bufferedConnection;
	}

	try {
		DBConnection.conn = await DBConnection.promise;
		console.log(
			`Successfully connected to MongoDB 📦!!! \nDatabase name : ${DBConnection.conn.connection.name}`
		);

		return DBConnection.conn;
	} catch (error) {
		console.log(`Error connecting to DB, ERROR:${error}`);
		DBConnection.conn = null;
		DBConnection.promise = null;
		throw error;
	}
};
