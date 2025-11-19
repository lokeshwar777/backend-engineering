import { Router } from "express";
import resourceRouter from "./resource.route.js";

const apiRouter = Router();

apiRouter.use("/resources", resourceRouter);

export default apiRouter;
