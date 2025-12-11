import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { ERRORS } from "../constants/index.js";

const zodValidator =
	(schema: z.ZodType) =>
	(req: Request, _: Response, next: NextFunction): void => {
		const result = schema.safeParse(req.body);
		if (result.success) {
			return next();
		}
		const { fieldErrors } = z.flattenError(result.error);
		next(ERRORS.ZOD_VALIDATION_ERROR(fieldErrors));
	};

export { zodValidator };
