import { NextFunction, Request, Response } from "express";
import ApplicationError, {
	ApplicationErrorType,
} from "../utils/applicationError";
import mongoose from "mongoose";

// This is a placeholder for the authorize middleware
const validationErrorHandler = (
	error: any,
	_: Request,
	__: Response,
	next: NextFunction
) => {
	if (error instanceof mongoose.Error.ValidationError) {
		next(
			new ApplicationError({
				errors: error.errors,
				type: ApplicationErrorType.dbValidation,
				statusCode: 422,
			})
		);
	}
	next(error);
};

export default validationErrorHandler;