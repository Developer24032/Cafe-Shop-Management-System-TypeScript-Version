import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import Customer from "../models/customer";

// This is a placeholder for the authorize middleware
const authorize = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const [__, accessToken] = (req.header("Authorization") as string).split(
			" "
		);
		const decoded = verify(accessToken, process.env.SECRET, {
			algorithms: [process.env.ACCESS_TOKEN_ALGO as any],
		}) as any;
		req.customer =
			(await Customer.findOne({ _id: decoded.customer.id })) || decoded.customer.id;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).end();
		return;
	}
};

export default authorize;