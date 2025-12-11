import { config } from "@dotenvx/dotenvx";
import { startApp } from "./app.js";
import { connectToDB } from "./db/connectDB.js";

// env variables injection config
config({
	ignore: ["MISSING_ENV_FILE"],
});

async function main(): Promise<void> {
	// db connection
	await connectToDB();

	// start listening on express server
	startApp();
}

main().catch((error) => {
	console.error(`failed to start app, ERROR: ${error}`);
	process.exit(1);
});
