import mongoose from "mongoose";

export {}; // atleast one import/export = module

declare global {
	interface GlobalMongoose {
		conn: mongoose.Mongoose | null;
		promise: Promise<mongoose.Mongoose> | null;
	}
	var mongoose: GlobalMongoose;
}
