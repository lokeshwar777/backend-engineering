import type { LoginInput, RegisterInput } from "../schemas/index.js";
import type { IAuthResponse } from "../types/auth.interface.js";

const registerUser = async (data: RegisterInput): Promise<IAuthResponse> => {
	// 1. check for existing user - if present ask to login
	// 2. encrypt password if present
	// 3. create new user & save
	// 4. send acknowledgement/response
	const response: IAuthResponse = await {}; // sample
	return response;
};

const loginUser = async (data: LoginInput): Promise<IAuthResponse> => {
	// 1. check for user
	// 2. check for password if present
	// 3. perform login
	// 4. get user info from database
	// 5. store user info based on strategy (like token)
	const response: IAuthResponse = await {}; // sample
	return response;
};

const logoutUser = async (): Promise<IAuthResponse> => {
	// 1. check if user is already is logged out
	// 2. perform logout by using existing user info
	const response: IAuthResponse = await {}; // sample
	return response;
};

export const authService = { registerUser, loginUser, logoutUser };
