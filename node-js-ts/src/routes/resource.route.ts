import { Router } from "express";

import { resourceHandlers } from "../controllers/resource.controller.js";

const resourceRouter = Router();

resourceRouter
	.route("/")
	.get(resourceHandlers.getResources)
	.post(resourceHandlers.createResource);

resourceRouter
	.route("/:id")
	.get(resourceHandlers.getResource)
	.put(resourceHandlers.replaceResource)
	.patch(resourceHandlers.editResource)
	.delete(resourceHandlers.deleteResource);

export default resourceRouter;
