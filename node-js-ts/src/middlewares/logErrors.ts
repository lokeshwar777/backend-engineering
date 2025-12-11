import type { ErrorRequestHandler, NextFunction, Request } from "express";
import APIError from "../utils/apiError.js";
// import { logger } from "../logger/index.js";

export const logErrors: ErrorRequestHandler = (
	err: unknown,
	req: Request,
	_,
	next: NextFunction,
) => {
	// if not using `pino-http`
	// const reqLogger = logger.child({ url: req.url, method: req.method });

	const reqLogger = req?.log; // comes from `pino-http`

	if (!reqLogger) {
		console.error("Logger is missing!!!");
		console.error(err);
		return next();
	}

	if (err instanceof APIError) {
		reqLogger.error(
			{ message: err.message, statusCode: err.statusCode },
			"[API Error]",
		);
	} else if (err instanceof Error) {
		// log full error stack tree if present
		reqLogger.error(
			{ name: err.name, stack: err.stack },
			"[Unhandled Error]",
		);
	} else {
		// simply log error
		reqLogger.error({ error: String(err) }, "[Unknown Error]");
	}
	next(err); // pass error to next middleware
};
