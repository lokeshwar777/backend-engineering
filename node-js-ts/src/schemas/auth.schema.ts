import z from "zod";

const registerSchema = z.object({
	fullName: z.string().min(3, "Full name must be at least 3 characters"),
	username: z
		.string()
		.min(7, "Username must be at least 7 characters")
		.max(20, "Username must be at most 20 characters"),
	email: z.email(),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z
	.object({
		username: z
			.string()
			.min(7, "Username must be at least 7 characters")
			.max(20, "Username must be at most 20 characters"),
		email: z.email(),
		password: z.string().min(8, "Password must be at least 8 characters"),
	})
	.refine((data) => data.username || data.email, {
		error: "Either email or username is required",
		path: ["email"],
	});

type RegisterInput = z.infer<typeof registerSchema>;
type LoginInput = z.infer<typeof loginSchema>;

export { registerSchema, loginSchema, RegisterInput, LoginInput };
