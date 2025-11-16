// NOTE: This is the inner implementation of [express-async-handler](https://www.npmjs.com/package/express-async-handler)

import type { NextFunction, Request, RequestHandler, Response } from "express";

/**
 *
 * @param requestHandler that uses async code
 * @returns middleware that passes any errors to next()
 */

const asyncHandler =
	(requestHandler: RequestHandler) =>
	(req: Request, res: Response, next: NextFunction): Promise<void> =>
		Promise.resolve(requestHandler(req, res, next))
			.then(() => undefined)
			// .then(() => void 0) // just another way
			.catch(next);

export default asyncHandler;
