import { Router } from "express";
import resourceRouter from "./resource.route.js";
import userRouter from "./user.route.js";

const apiRouter = Router();

apiRouter.use("/resources", resourceRouter);
apiRouter.use("/users", userRouter);

export default apiRouter;
