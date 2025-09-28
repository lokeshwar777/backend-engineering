import { config } from "@dotenvx/dotenvx";
import { startApp } from "./app.js";
import { connectToDB } from "./db/connectDB.js";

// env variables injection config
config({
	ignore: ["MISSING_ENV_FILE"],
});

// db connection
connectToDB();

// start listening on express server
startApp();
