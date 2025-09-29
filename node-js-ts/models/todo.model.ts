import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: "",
			maxLength: 50,
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

// stored is mongoDB as todos collection (lowercase plural form)
export const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
