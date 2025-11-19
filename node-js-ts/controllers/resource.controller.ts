import mongoose from "mongoose";
import type { Request, Response } from "express";
import { resourceService } from "../services/index.js";

const createResource = async (req: Request, res: Response): Promise<void> => {
	const { title, description } = req.body;
	try {
		const newResource = await resourceService.addResource(
			title,
			description,
		);
		res.status(200).json({
			success: true,
			message: "Resource created successfully!",
			data: newResource,
		});
	} catch (error) {
		console.error(`Error occurred while creating a resource: ${error}`);
		res.status(500).json({
			success: false,
			error: "Error creating resource",
		});
		throw error;
	}
};

const getResources = async (req: Request, res: Response): Promise<void> => {
	try {
		const resources = await resourceService.fetchResources();
		res.status(200).json({
			success: true,
			message: "Resources fetched successfully!",
			data: resources,
		});
	} catch (error) {
		console.error(`Error occurred while fetching resources: ${error}`);
		res.status(500).json({
			success: false,
			error: "Error retrieving resources",
		});
		throw error;
	}
};

const getResource = async (req: Request, res: Response): Promise<void> => {
	const resourceId = req.params?.id;
	if (!resourceId || !mongoose.Types.ObjectId.isValid(resourceId)) {
		// BAD REQUEST
		res.status(400).json({
			success: false,
			error: "Invalid resource id, unable to fetch!",
		});
		return;
	}
	try {
		const resource = await resourceService.fetchResource(resourceId);
		if (!resource) {
			res.status(404).json({
				success: false,
				message: "Resource Not Found!",
			});
		}
		res.status(200).json({
			success: true,
			message: "Resource fetched successfully!",
			data: resource,
		});
	} catch (error) {
		console.error(`Error occurred while fetching resources: ${error}`);
		res.status(500).json({
			success: false,
			error: "Error retrieving resources",
		});
		throw error;
	}
};

const editResource = async (req: Request, res: Response): Promise<void> => {
	const resourceId = req.params?.id;
	if (!resourceId || !mongoose.Types.ObjectId.isValid(resourceId)) {
		// BAD REQUEST
		res.status(400).json({
			success: false,
			error: "Invalid resource id, unable to edit!",
		});
	}
	const { title: newTitle, description: newDescription } = req.body;
	try {
		const editedResource = await resourceService.changeResource(
			resourceId,
			newTitle,
			newDescription,
		);
		if (!editedResource) {
			res.status(404).json({
				success: false,
				message: "TODO not found!",
			});
			return;
		}
		res.status(200).json({
			success: true,
			message: "Resource edited successfully!",
			data: editedResource,
		});
	} catch (error) {
		console.error(`Error occurred while editing resource: ${error}`);
		res.status(500).json({
			success: false,
			error: "Error editing resource",
		});
		throw error;
	}
};

const replaceResource = async (req: Request, res: Response): Promise<void> => {
	const resourceId = req.params?.id;
	if (!resourceId || !mongoose.Types.ObjectId.isValid(resourceId)) {
		// BAD REQUEST
		res.status(400).json({
			success: false,
			error: "Invalid resource id, unable to replace!",
		});
		return;
	}
	const { title: newTitle, description: newDescription } = req.body;
	try {
		const editedResource = await resourceService.changeResource(
			resourceId,
			newTitle,
			newDescription,
		);
		if (!editedResource) {
			res.status(404).json({
				success: false,
				message: "TODO not found!",
			});
			return;
		}
		res.status(200).json({
			success: true,
			message: "Resource edited successfully!",
			data: editedResource,
		});
	} catch (error) {
		console.error(`Error occurred while editing resource: ${error}`);
		res.status(500).json({
			success: false,
			error: "Error editing resource",
		});
		throw error;
	}
};

const deleteResource = async (req: Request, res: Response): Promise<void> => {
	const resourceId = req.params?.id;
	if (!resourceId || !mongoose.Types.ObjectId.isValid(resourceId)) {
		// BAD REQUEST
		res.status(400).json({
			success: false,
			error: "Invalid resource id, unable to delete!",
		});
		return;
	}
	try {
		const deletedResource =
			await resourceService.removeResource(resourceId);
		if (!deletedResource) {
			res.status(404).json({
				success: false,
				message: "TODO not found!",
			});
			return;
		}
		res.status(200).json({
			message: "Resource deleted successfully!",
			data: deletedResource,
		});
	} catch (error) {
		console.error(`Error occurred while deleting resource: ${error}`);
		res.status(500).json({
			success: false,
			error: "Error deleting resource",
		});
		throw error;
	}
};

export const resourceHandlers = {
	createResource,
	getResources,
	getResource,
	editResource,
	replaceResource,
	deleteResource,
};
