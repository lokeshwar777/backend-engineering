import mongoose from "mongoose";
import type { Request, Response } from "express";
import { todoService } from "../services/index.js";

const createTodo = async (req: Request, res: Response): Promise<void> => {
	const { title, description } = req.body;
	try {
		const newTodo = await todoService.addTodo(title, description);
		res.status(200).json({
			success: true,
			message: "Todo created successfully!",
			data: newTodo,
		});
	} catch (error) {
		console.error(`Error occurred while creating a todo: ${error}`);
		res.status(500).json({
			success: false,
			error: "Error creating todo",
		});
		throw error;
	}
};

const getTodos = async (req: Request, res: Response): Promise<void> => {
	try {
		const todos = await todoService.fetchTodos();
		res.status(200).json({
			success: true,
			message: "Todos fetched successfully!",
			data: todos,
		});
	} catch (error) {
		console.error(`Error occurred while fetching todos: ${error}`);
		res.status(500).json({
			success: false,
			error: "Error retrieving todos",
		});
		throw error;
	}
};

const getTodo = async (req: Request, res: Response): Promise<void> => {
	const todoId = req.params?.id;
	if (!todoId || !mongoose.Types.ObjectId.isValid(todoId)) {
		// BAD REQUEST
		res.status(400).json({
			success: false,
			error: "Invalid todo id, unable to fetch!",
		});
		return;
	}
	try {
		const todo = await todoService.fetchTodo(todoId);
		if (!todo) {
			res.status(404).json({
				success: false,
				message: "Todo Not Found!",
			});
		}
		res.status(200).json({
			success: true,
			message: "Todo fetched successfully!",
			data: todo,
		});
	} catch (error) {
		console.error(`Error occurred while fetching todos: ${error}`);
		res.status(500).json({
			success: false,
			error: "Error retrieving todos",
		});
		throw error;
	}
};

const editTodo = async (req: Request, res: Response): Promise<void> => {
	const todoId = req.params?.id;
	if (!todoId || !mongoose.Types.ObjectId.isValid(todoId)) {
		// BAD REQUEST
		res.status(400).json({
			success: false,
			error: "Invalid todo id, unable to edit!",
		});
	}
	const { title: newTitle, description: newDescription } = req.body;
	try {
		const editedTodo = await todoService.changeTodo(
			todoId,
			newTitle,
			newDescription,
		);
		if (!editedTodo) {
			res.status(404).json({
				success: false,
				message: "TODO not found!",
			});
			return;
		}
		res.status(200).json({
			success: true,
			message: "Todo edited successfully!",
			data: editedTodo,
		});
	} catch (error) {
		console.error(`Error occurred while editing todo: ${error}`);
		res.status(500).json({
			success: false,
			error: "Error editing todo",
		});
		throw error;
	}
};

const replaceTodo = async (req: Request, res: Response): Promise<void> => {
	const todoId = req.params?.id;
	if (!todoId || !mongoose.Types.ObjectId.isValid(todoId)) {
		// BAD REQUEST
		res.status(400).json({
			success: false,
			error: "Invalid todo id, unable to replace!",
		});
		return;
	}
	const { title: newTitle, description: newDescription } = req.body;
	try {
		const editedTodo = await todoService.changeTodo(
			todoId,
			newTitle,
			newDescription,
		);
		if (!editedTodo) {
			res.status(404).json({
				success: false,
				message: "TODO not found!",
			});
			return;
		}
		res.status(200).json({
			success: true,
			message: "Todo edited successfully!",
			data: editedTodo,
		});
	} catch (error) {
		console.error(`Error occurred while editing todo: ${error}`);
		res.status(500).json({
			success: false,
			error: "Error editing todo",
		});
		throw error;
	}
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
	const todoId = req.params?.id;
	if (!todoId || !mongoose.Types.ObjectId.isValid(todoId)) {
		// BAD REQUEST
		res.status(400).json({
			success: false,
			error: "Invalid todo id, unable to delete!",
		});
		return;
	}
	try {
		const deletedTodo = await todoService.removeTodo(todoId);
		if (!deletedTodo) {
			res.status(404).json({
				success: false,
				message: "TODO not found!",
			});
			return;
		}
		res.status(200).json({
			message: "Todo deleted successfully!",
			data: deletedTodo,
		});
	} catch (error) {
		console.error(`Error occurred while deleting todo: ${error}`);
		res.status(500).json({
			success: false,
			error: "Error deleting todo",
		});
		throw error;
	}
};

export const todoHandlers = {
	createTodo,
	getTodos,
	getTodo,
	editTodo,
	replaceTodo,
	deleteTodo,
};
