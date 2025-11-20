import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: "",
			maxLength: 500,
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

// stored is mongoDB as resources collection (lowercase plural form)
export const Resource =
	mongoose.models.Resource || mongoose.model("Resource", resourceSchema);
