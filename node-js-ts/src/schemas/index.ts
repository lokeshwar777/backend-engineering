import { loginSchema, registerSchema } from "./auth.schema.js";
import { changePasswordSchema, updateProfileSchema } from "./user.schema.js";

export type { RegisterInput, LoginInput } from "./auth.schema.js";

export const AuthSchema = { registerSchema, loginSchema };
export const UserSchema = { updateProfileSchema, changePasswordSchema };
