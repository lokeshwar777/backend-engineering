interface SerialisedAPIResponse {
	success: boolean;
	message: string;
	data: unknown;
	meta?: unknown;
	statusCode: number;
}

export default class APIResponse {
	readonly success: boolean;
	readonly message: string;
	readonly data: unknown;
	readonly meta?: unknown;
	readonly statusCode: number;

	constructor(
		message = "",
		success = true,
		statusCode = 200,
		data = {},
		meta?: unknown
	) {
		this.message = message;
		this.success = success;
		this.statusCode = statusCode;
		this.data = data;
		this.meta = meta;
	}

	toJSON(): SerialisedAPIResponse {
		const response: SerialisedAPIResponse = {
			message: this.message,
			success: this.success,
			statusCode: this.statusCode,
			data: this.data,
			// ...(this.meta !== undefined && { meta: this.meta }), // truthy-check
			// ...(this.meta ? { meta: this.meta } : {}), // might skil 0, '', false (so use)
			// ...(this.meta !== undefined ? { meta: this.meta } : {}),
		};

		if (this.meta !== undefined) {
			response.meta = this.meta;
		}

		return response;
	}
}
