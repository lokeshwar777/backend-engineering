import { Todo } from "../models/todo.model.js";

const addTodo = async (title: string, description: string) => {
	let newTodo = null;
	try {
		newTodo = await Todo.create({ title, description });
	} catch (error) {
		console.error(`Error occurred while adding a todo to DB: ${error}`);
		throw error;
	}
	return newTodo;
};

const fetchTodos = async () => {
	let todos = null;
	try {
		todos = await Todo.find();
	} catch (error) {
		console.error(`Error occurred while retrieving todos from DB: ${error}`);
		throw error;
	}
	return todos;
};

const fetchTodo = async (id: string) => {
	let todo = null;
	try {
		todo = await Todo.findById(id); // same as findOne({ _id : id })
	} catch (error) {
		console.error(`Error occurred while retrieving todo from DB: ${error}`);
		throw error;
	}
	return todo;
};

const changeTodo = async (id: string, title: string, description: string) => {
	let changedTodo = null;
	try {
		changedTodo = await Todo.findByIdAndUpdate(
			id, // same as { _id : id}
			{ title, description }, // if any fields are undefined they are ignored
			{
				new: true, // new returns the updated doc else older
				runValidators: true,
			}
		);
	} catch (error) {
		console.error(`Error occurred while changing todo in DB: ${error}`);
		throw error;
	}
	return changedTodo;
};

const removeTodo = async (id: string) => {
	let deletedTodo = null;
	try {
		deletedTodo = await Todo.findByIdAndDelete(id);
	} catch (error) {
		console.error(`Error occurred while deleting todo from DB: ${error}`);
		throw error;
	}
	return deletedTodo;
};

export default { addTodo, fetchTodos, fetchTodo, changeTodo, removeTodo };
