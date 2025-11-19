import type { IUser } from "../types/user.interface.js";

const getUserProfile = async (userId: string): Promise<IUser> => {
	// 1. check whether the user exists or not using id
	// 2. fetch user profile data from DB/API/cookies with id
	// 2. sent the data as response
	const userData: IUser = await { id: "777" }; // sample
	return userData;
};

const changeUserPassword = async (
	userId: string,
	newPassword: string,
): Promise<void> => {
	// 1. find user using id
	// 2. validate new password
	// 3. optinally check if it is a weak/old password
	// 4. change/update password & hash (optional)
	// 5. save new password
	// 6. send an ACK as a response
};

export const userService = {
	getUserProfile,
	changeUserPassword,
};
