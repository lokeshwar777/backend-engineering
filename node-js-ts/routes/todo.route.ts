import { Router } from "express";

import todoController from "../controllers/todo.controller.js";

const todoRouter = Router();

todoRouter.route("/").get(todoController.getTodos).post(todoController.createTodo);

todoRouter
	.route("/:id")
	.get(todoController.getTodo)
	.put(todoController.replaceTodo)
	.patch(todoController.editTodo)
	.delete(todoController.deleteTodo);

export default todoRouter;
