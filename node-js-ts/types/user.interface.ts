export enum Role {
	USER = "USER",
	ADMIN = "ADMIN",
	GUEST = "GUEST",
}

export interface IUser {
	userId: string;
	fullName: string;
	userName: string;
	email: string;
	password: string;
	isVerified: boolean;
	role: Role;
	createdAt?: Date;
	updatedAt?: Date;
}
