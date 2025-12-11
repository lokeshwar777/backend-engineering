import { Router } from "express";
import { zodValidator } from "../middlewares/zodValidate.middleware.js";
import { AuthSchema } from "../schemas/index.js";
import { authHandlers } from "../controllers/index.js";

const authRouter = Router();

authRouter.post(
	"/register",
	zodValidator(AuthSchema.registerSchema),
	authHandlers.registerHandler,
);

authRouter.post(
	"/login",
	zodValidator(AuthSchema.loginSchema),
	authHandlers.loginHandler,
);

authRouter.post(
	"/logout",
	zodValidator(AuthSchema.loginSchema),
	authHandlers.logoutHandler,
);

export default authRouter;
