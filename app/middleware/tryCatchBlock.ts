import { NextFunction, Request, Response } from "express";

export default function tryCatchBlock(
	f: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
	return (req: Request, res: Response, next: NextFunction) => {
		f(req, res, next).catch((err) => {
			next(err);
		});
	};
}