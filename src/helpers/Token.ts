import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import response from '../helpers/Common';
dotenv.config();

export interface CustomRequest<T = any> extends Request {
    payload: T;
}

export const Token = {
    generateToken: (payload: any): string => {
        const token = jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: '30d' });
        return token;
    },
    generateRefreshToken: (payload: any): string => {
        const token = jwt.sign(payload, process.env.JWT_KEY!);
        return token;
    },
    checkToken: async (req: CustomRequest, res: Response, next: NextFunction) => {
        try {
            let token;
            if (req.headers.authorization) {
                const auth = req.headers.authorization;
                token = auth.split(" ")[1];
                const decoded = jwt.verify(token, process.env.JWT_KEY!);
                req.payload = decoded;
                next();
            } else {
                return response(res, 404, "Server needs a token");
            }
        } catch (err: any) {
            console.error(err.message);
            if (err instanceof JsonWebTokenError) {
                return response(res, 401, "Invalid token");
            } else if (err instanceof TokenExpiredError) {
                return response(res, 401, "Token expired", err);
            } else {
                return response(res, 401, "Token not active");
            }
        }
    },
    decodeToken: (payload: any): any => {
        const decoded = jwt.verify(payload, process.env.JWT_KEY!);
        return decoded
    },
};
