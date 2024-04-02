import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { SECRET_KEY } from "../../config/config";

declare global {
    namespace Express { 
        interface Request {
            userId?: string;
        }
    }
}

export function AuthMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
){

    const token = request.headers.authorization.split(" ")[1];
    console.log(token);

    try {

        const decoded = verify(token, SECRET_KEY);
        const {id} = decoded as JwtPayload;
        
        console.log(decoded as JwtPayload);
        console.log(id);

        request.userId = id;
        next();
        
    } catch (error) {
        return response.status(401).json({error: error});
    }
    
    if(!token) return response.json({messagem: "you dont have authorization to access this route"});


}