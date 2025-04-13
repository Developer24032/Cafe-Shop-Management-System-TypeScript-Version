import mongoose from "mongoose";

export default class ApplicationError {
	message?: string;
	path?: string;
	userId?: string;
	statusCode?: number;
	errors?: {
		[key: string]: mongoose.Error.ValidatorError | mongoose.Error.CastError;
	};
	type: ApplicationErrorType;
	constructor({
		message,
		path,
		type,
		errors,
		statusCode,
	}: ApplicationErrorProps) {
		this.message = message;
		this.path = path;
		this.type = type;
		this.errors = errors;
		this.statusCode = statusCode;
	}

	toJson() {
		return {
			errors: this.errors,
			message: this.message,
			path: this.path,
			userId: this.userId,
			type: this.type,
		};
	}
}

export interface ApplicationErrorProps {
	message?: string;
	path?: string;
	type: ApplicationErrorType;
	statusCode?: number;
	errors?: {
		[key: string]: mongoose.Error.ValidatorError | mongoose.Error.CastError;
	};
}
export enum ApplicationErrorType {
	dbValidation = "dbValidation",
	notFound = "Not-Found",
}