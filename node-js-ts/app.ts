import express from "express";
import apiRouter from "./routes/index.js";
import { httpLogger } from "./middlewares/logger.middleware.js";
import { jsonErrorResponder } from "./middlewares/jsonErrorResponder.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";

const PORT = process.env.PORT;

const app = express();

// --- MIDDLEWARES ---
app.use(express.json()); // parses application/json
// app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // parses application/x-www-form-urlencoded

// pino-http middleware for logging
app.use(httpLogger);

//  Serve static assets
app.use(express.static("public"));

// --- ROUTES ---
app.use("/api/v1", apiRouter);

// Error Middlewares (order matters!!!)
app.use(jsonErrorResponder); // use if needed to handle client side JSON errors
app.use(globalErrorHandler); // handle HTML & non-JSON errors

export const startApp = () =>
	app.listen(PORT, () => {
		console.log(`⚙️ Server listening on PORT :${PORT}!!`);
	});
