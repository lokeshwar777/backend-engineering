import { Router } from "express";
import resourceRouter from "./resource.route.js";
import userRouter from "./user.route.js";
import authRouter from "./auth.route.js";

const apiRouter = Router();

apiRouter.use("/resources", resourceRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
