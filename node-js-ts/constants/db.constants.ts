const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
	throw new Error("777, check db uri string");
}

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

export { MONGODB_URI, MONGODB_USERNAME, MONGODB_PASSWORD, DATABASE_NAME };
