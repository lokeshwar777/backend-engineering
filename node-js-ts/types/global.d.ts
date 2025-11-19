import type mongoose from "mongoose";
import type { IUser } from "../user.interface.ts";
export {}; // atleast one import/export = module

declare global {
	interface GlobalMongoose {
		conn: mongoose.Mongoose | null;
		promise: Promise<mongoose.Mongoose> | null;
	}
	var mongoose: GlobalMongoose;

	namespace Express {
		interface Request {
			user?: IUser; // ensure req.user is always avaiable/undefined
		}
	}
}
