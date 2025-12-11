import type { Request, RequestHandler, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { userService } from "../services/index.js";
import { RESPONSES } from "../constants/index.js";

const getProfile: RequestHandler = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const userId = req.user?.id;
		// check for existence userId
		if (!userId) {
			// send appropriate error response
			return;
		}
		const result = await userService.getUserProfile(userId);
		const response = RESPONSES.OK(
			"User profile fetched successfully!",
			result,
		);
		res.status(response.statusCode).json(response.toJSON());
	},
);

const changePassword: RequestHandler = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const { password: newPassword } = req.body!; // non-null assertion (guarantee)
		const userId = req.user?.id; // safe
		// check for existence of newPassword & userId
		if (!userId || !newPassword) {
			// send appropriate error response
			return;
		}
		await userService.changeUserPassword(userId, newPassword);
		const response = RESPONSES.OK("Password changed successfully!");
		res.status(response.statusCode).json(response.toJSON());
	},
);

export const userHandlers = {
	getProfile,
	changePassword,
};
