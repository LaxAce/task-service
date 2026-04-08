import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IValidationSchema } from "types";
import { catchError } from "./apiResponse";

export const validate = (schema: IValidationSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schema.body) {
                req.body = {...schema.body.parse(req.body) as typeof req.body, user: req.body.user};
            }

            if (schema.params) {
                req.params = schema.params.parse(req.params) as typeof req.params;
            }

            if (schema.query) {
                req.query = schema.query.parse(req.query) as typeof req.query;
            }
            return next();
        } catch (error: any) {
            const parsedError = JSON.parse(error);
            console.error(parsedError);
            return catchError(parsedError?.[0]?.message, res, 400);
        }
    }
}


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req?.headers?.authorization?.split(" ")?.[1] ?? "";

        if (!token) {
            throw new Error("Missing token")
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET as string);
        req.body.user = decode;

        return next();
    } catch (error: any) {
        console.error('Error verifying token', error);
        return catchError(error.message, res, 500);
    }
}
