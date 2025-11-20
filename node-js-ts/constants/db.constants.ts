const ACTIVE_DB = process.env.ACTIVE_DB;
const MONGO_ATLAS = process.env.MONGO_ATLAS;
const MONGO_LOCAL = process.env.MONGO_LOCAL;
const MONGODB_URI = ACTIVE_DB === "atlas" ? MONGO_ATLAS : MONGO_LOCAL;
if (!MONGODB_URI) {
	throw new Error("777, check db uri string");
}

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

export { MONGODB_URI, MONGODB_USERNAME, MONGODB_PASSWORD, DATABASE_NAME };
