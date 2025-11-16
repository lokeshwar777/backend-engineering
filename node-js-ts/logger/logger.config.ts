import type { LoggerOptions } from "pino";
import { LOG_LEVEL } from "../constants/index.js";

const loggerConfig: LoggerOptions = {
	// customLevels: {loki: 777}, // logger.loki()
	level: LOG_LEVEL,

	// use for abstraction
	/*
	redact: {
		paths: ["req.headers.authorization", "user.email", "body.password"],
		remove: true, // doesn't display
	},
    */

	// timestamp: () => `,"time":"${new Date().toISOString()}"`,
};

export { loggerConfig };
