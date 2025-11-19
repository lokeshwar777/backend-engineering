import { Todo } from "../models/index.js";

const addTodo = async (title: string, description: string): Promise<void> => {
	let newTodo = null;
	try {
		newTodo = await Todo.create({ title, description });
	} catch (error) {
		console.error(`Error occurred while adding a todo to DB: ${error}`);
		throw error;
	}
	return newTodo;
};

const fetchTodos = async (): Promise<InstanceType<typeof Todo>[]> => {
	try {
		return await Todo.find();
	} catch (error) {
		console.error(
			`Error occurred while retrieving todos from DB: ${error}`,
		);
		throw error;
	}
};

const fetchTodo = async (
	id: string,
): Promise<InstanceType<typeof Todo> | null> => {
	let todo: InstanceType<typeof Todo> | null = null;
	try {
		todo = await Todo.findById(id); // same as findOne({ _id : id })
	} catch (error) {
		console.error(`Error occurred while retrieving todo from DB: ${error}`);
		throw error;
	}
	return todo;
};

const changeTodo = async (
	id: string,
	title: string,
	description: string,
): Promise<InstanceType<typeof Todo> | null> => {
	let changedTodo: InstanceType<typeof Todo> | null = null;

	try {
		changedTodo = await Todo.findByIdAndUpdate(
			id, // same as { _id : id}
			{ title, description }, // if any fields are undefined they are ignored
			{
				new: true, // new returns the updated doc else older
				runValidators: true,
			},
		);
	} catch (error) {
		console.error(`Error occurred while changing todo in DB: ${error}`);
		throw error;
	}
	return changedTodo;
};

const removeTodo = async (
	id: string,
): Promise<InstanceType<typeof Todo> | null> => {
	let deletedTodo: InstanceType<typeof Todo> | null = null;
	try {
		deletedTodo = await Todo.findByIdAndDelete(id);
	} catch (error) {
		console.error(`Error occurred while deleting todo from DB: ${error}`);
		throw error;
	}
	return deletedTodo;
};

export const todoService = {
	addTodo,
	fetchTodos,
	fetchTodo,
	changeTodo,
	removeTodo,
};
