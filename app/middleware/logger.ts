import { NextFunction, Request, Response } from "express";

const Logger = (req: Request, _: Response, next: NextFunction) => {
	if (process.env.LOG) {
		console.log(`${req.method} ${process.env.API_HOST}${req.url}`);
	}
	next();
};

export default Logger;