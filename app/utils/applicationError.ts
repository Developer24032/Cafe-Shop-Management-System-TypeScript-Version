import mongoose from "mongoose";

export default class ApplicationError {
	message?: string;
	path?: string;
	customerId?: string;
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
			customerId: this.customerId,
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
	VALIDATION_ERROR = "VALIDATION_ERROR",
	UNAUTHORIZED = "UNAUTHORIZED",
	NOT_FOUND = "NOT_FOUND",
}