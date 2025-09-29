import mongoose from "mongoose";
import { Request, Response } from "express";
import todoService from "../services/todo.service.js";

const createTodo = async (req: Request, res: Response) => {
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

const getTodos = async (req: Request, res: Response) => {
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

const getTodo = async (req: Request, res: Response) => {
	const todoId = req.params?.id;
	if (!todoId || !mongoose.Types.ObjectId.isValid(todoId)) {
		// BAD REQUEST
		return res.status(400).json({
			success: false,
			error: "Invalid todo id, unable to fetch!",
		});
	}
	try {
		const todo = await todoService.fetchTodo(todoId);
		if (!todo) {
			return res.status(404).json({
				success: false,
				message: "TODO not found!",
			});
		}
		res.status(200).json({
			success: true,
			message: "Todo fetched successfully!",
			data: todo,
		});
	} catch (error) {
		console.error(`Error occurred while fetching todo: ${error}`);
		res.status(500).json({
			success: false,
			error: "Error retrieving todo",
		});
		throw error;
	}
};

const editTodo = async (req: Request, res: Response) => {
	const todoId = req.params?.id;
	if (!todoId || !mongoose.Types.ObjectId.isValid(todoId)) {
		// BAD REQUEST
		return res.status(400).json({
			success: false,
			error: "Invalid todo id, unable to edit!",
		});
	}
	const { title: newTitle, description: newDescription } = req.body;
	try {
		const editedTodo = await todoService.changeTodo(todoId, newTitle, newDescription);
		if (!editedTodo) {
			return res.status(404).json({ success: false, message: "TODO not found!" });
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

const replaceTodo = async (req: Request, res: Response) => {
	const todoId = req.params?.id;
	if (!todoId || !mongoose.Types.ObjectId.isValid(todoId)) {
		// BAD REQUEST
		return res.status(400).json({
			success: false,
			error: "Invalid todo id, unable to replace!",
		});
	}
	const { title: newTitle, description: newDescription } = req.body;
	try {
		const editedTodo = await todoService.changeTodo(todoId, newTitle, newDescription);
		if (!editedTodo) {
			return res.status(404).json({ success: false, message: "TODO not found!" });
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

const deleteTodo = async (req: Request, res: Response) => {
	const todoId = req.params?.id;
	if (!todoId || !mongoose.Types.ObjectId.isValid(todoId)) {
		// BAD REQUEST
		return res.status(400).json({
			success: false,
			error: "Invalid todo id, unable to delete!",
		});
	}
	try {
		const deletedTodo = await todoService.removeTodo(todoId);
		if (!deletedTodo) {
			return res.status(404).json({ success: false, message: "TODO not found!" });
		}
		res.status(200).json({ message: "Todo deleted successfully!", data: deletedTodo });
	} catch (error) {
		console.error(`Error occurred while deleting todo: ${error}`);
		res.status(500).json({
			success: false,
			error: "Error deleting todo",
		});
		throw error;
	}
};

export default { createTodo, getTodos, getTodo, editTodo, replaceTodo, deleteTodo };
