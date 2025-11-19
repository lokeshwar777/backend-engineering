import { Router } from "express";

import { todoHandlers } from "../controllers/todo.controller.js";

const todoRouter = Router();

todoRouter.route("/").get(todoHandlers.getTodos).post(todoHandlers.createTodo);

todoRouter
	.route("/:id")
	.get(todoHandlers.getTodo)
	.put(todoHandlers.replaceTodo)
	.patch(todoHandlers.editTodo)
	.delete(todoHandlers.deleteTodo);

export default todoRouter;
