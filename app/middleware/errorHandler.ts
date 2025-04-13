import { NextFunction, Request, Response } from "express";
import ApplicationError from "../utils/applicationError";
import mongoose from "mongoose";

// This is a placeholder for the authorize middleware
const errorHandler = (
	error: any,
	_: Request,
	res: Response,
	__: NextFunction
) => {
	if (error instanceof ApplicationError) {
		res.status(error.statusCode || 400).json(error.toJson());
	} else if (error instanceof mongoose.Error.CastError) {
		res.status(400).json({ error: "invalid id" });
	} else {
		console.log(error);
		res.status(500).send("Internal server Error");
	}
};

export default errorHandler;