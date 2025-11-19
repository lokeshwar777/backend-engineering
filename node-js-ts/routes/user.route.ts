import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { userHandlers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/profile", authenticate, userHandlers.getProfile);

userRouter.post("/change-password", authenticate, userHandlers.changePassword);

export default userRouter;
