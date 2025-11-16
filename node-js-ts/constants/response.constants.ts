import APIResponse from "../utils/apiResponse.js";

export const RESPONSES = {
	OK: (message = "success", data = {}, meta?: unknown): APIResponse =>
		new APIResponse(message, true, 200, data, meta),

	CREATED: (message = "created", data = {}, meta?: unknown): APIResponse =>
		new APIResponse(message, true, 201, data, meta),
};
