interface SerialisedAPIError {
	name: string;
	message: string;
	statusCode: number;
	errorCode?: string;
	details?: unknown;
}

export default class APIError extends Error {
	readonly statusCode: number;
	readonly errorCode?: string;
	readonly details?: unknown;

	constructor(
		message: string,
		statusCode = 500,
		errorCode?: string,
		details?: unknown,
	) {
		super(message);
		this.name = this.constructor.name; // constructor.name is same as class name
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		this.details = details;

		// fixes prototye chain
		Object.setPrototypeOf(this, APIError.prototype);

		// skips internal constructor calls (intermediate nodes)
		// shows only src(error origin) & dest(catch block / logger)
		Error.captureStackTrace(this, this.constructor);
	}

	toJSON(): SerialisedAPIError {
		// approach 1 (concise but not clean)
		/*
		return {
			name: this.name,
			message: this.message,
			statusCode: this.statusCode,
            errorCode: this.errorCode ?? "INTERNAL_ERROR",
			...(this.details && { details: this.details }), // truthy check (or)
			...(typeof this.details === "object" && this.details !== null
				? { details: this.details }
				: {}), // safer, cleaner, explicit
		};
        */

		const errorPayload: SerialisedAPIError = {
			name: this.name,
			message: this.message,
			statusCode: this.statusCode,
			errorCode: this.errorCode ?? "INTERNAL_ERROR",
		};

		if (this.details) {
			errorPayload.details = this.details;
		}

		return errorPayload;
	}
}

/*
const printProto = (obj: unknown): void => {
	if (typeof obj !== "object" || obj === null) return;

	const proto = Object.getPrototypeOf(obj);
	console.log(
		`prototype of ${obj.constructor?.name ?? "null"} is ${proto?.constructor?.name ?? "null"}`
	);

	printProto(proto);
};
const apiError = new APIError();
printProto(apiError);
*/

// ? - is for optional
