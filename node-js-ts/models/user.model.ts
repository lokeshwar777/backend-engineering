import {
	Document,
	FlatRecord,
	Model,
	models,
	Schema,
	SchemaOptions,
	Types,
} from "mongoose";
import { IUser, Role } from "../types/user.interface.js";

export interface IUserDocument extends Omit<IUser, "userId">, Document {
	_id: Types.ObjectId;
}

const commonTransform = function (
	originalDocument: any,
	returnObject: Record<string, any>,
	options: any,
) {
	returnObject.userId = returnObject._id;
	delete returnObject.password;
	delete returnObject.__v;
	delete returnObject._id;
	return returnObject;
};

const options: SchemaOptions<FlatRecord<IUserDocument>> = {
	toJSON: { virtuals: true, transform: commonTransform },
	toObject: { virtuals: true, transform: commonTransform },
	timestamps: true,
};

const userSchema = new Schema<IUserDocument>(
	{
		fullName: { type: String, required: true, index: true },
		userName: { type: String, required: true, index: true },
		email: { type: String, required: true, index: true },
		password: { type: String, required: true, index: true },
		isVerified: { type: Boolean, default: false },
		role: { type: String, enum: Object.values(Role), default: Role.USER },
	},
	options,
);

userSchema.virtual("userId").get(function () {
	return this._id;
});

/** security++ -> hook to save hashed password instead of plain password */
userSchema.pre("save", () => {
	// TODO
});

/** custom method for password check */
userSchema.method("verifyPassword", () => {
	// TODO
});

export const User = models.User || new Model("User", userSchema);
