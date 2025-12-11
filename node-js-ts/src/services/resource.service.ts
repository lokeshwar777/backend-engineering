import { Resource } from "../models/index.js";

const addResource = async (
	title: string,
	description: string,
): Promise<void> => {
	let newResource = null;
	try {
		newResource = await Resource.create({ title, description });
	} catch (error) {
		console.error(`Error occurred while adding a resource to DB: ${error}`);
		throw error;
	}
	return newResource;
};

const fetchResources = async (): Promise<InstanceType<typeof Resource>[]> => {
	try {
		return await Resource.find();
	} catch (error) {
		console.error(
			`Error occurred while retrieving resources from DB: ${error}`,
		);
		throw error;
	}
};

const fetchResource = async (
	id: string,
): Promise<InstanceType<typeof Resource> | null> => {
	let resource: InstanceType<typeof Resource> | null = null;
	try {
		resource = await Resource.findById(id); // same as findOne({ _id : id })
	} catch (error) {
		console.error(
			`Error occurred while retrieving resource from DB: ${error}`,
		);
		throw error;
	}
	return resource;
};

const changeResource = async (
	id: string,
	title: string,
	description: string,
): Promise<InstanceType<typeof Resource> | null> => {
	let changedResource: InstanceType<typeof Resource> | null = null;

	try {
		changedResource = await Resource.findByIdAndUpdate(
			id, // same as { _id : id}
			{ title, description }, // if any fields are undefined they are ignored
			{
				new: true, // new returns the updated doc else older
				runValidators: true,
			},
		);
	} catch (error) {
		console.error(`Error occurred while changing resource in DB: ${error}`);
		throw error;
	}
	return changedResource;
};

const removeResource = async (
	id: string,
): Promise<InstanceType<typeof Resource> | null> => {
	let deletedResource: InstanceType<typeof Resource> | null = null;
	try {
		deletedResource = await Resource.findByIdAndDelete(id);
	} catch (error) {
		console.error(
			`Error occurred while deleting resource from DB: ${error}`,
		);
		throw error;
	}
	return deletedResource;
};

export const resourceService = {
	addResource,
	fetchResources,
	fetchResource,
	changeResource,
	removeResource,
};
