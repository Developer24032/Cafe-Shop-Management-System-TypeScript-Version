import { NextFunction, Request, Response } from "express";

const globalHeaders = (end?: boolean) => {
	return (_: Request, res: Response, next: NextFunction) => {
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Content-Type,Authorization"
		);
		res.setHeader(
			"Access-Control-Allow-Methods",
			"POST,GET,PUT,OPTIONS,DELETE"
		);
		res.setHeader(
			"Access-Control-Allow-Origin",
			process.env.ACESS_CONTROL_ALLOW_ORIGIN
		);
		if (end) {
			res.status(204).end();
			return;
		}
		next();
	};
};
export default globalHeaders;