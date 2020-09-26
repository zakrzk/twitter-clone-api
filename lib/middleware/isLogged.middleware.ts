import * as jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import {validationResult} from "express-validator";

export const isLogged = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({err: errors, message: 'Missing token. User not logged in.'})
    }

    const token: string = req.get('Authentication').split(' ')[1];
    let decodedToken;
    try {
        //todo export to .env
        decodedToken = jwt.verify(token, 'secret123');
    } catch (err) {
        return res.status(500).json({
            error: err.message,
            message: 'Could not decode token.'
        })
    }
    if (!decodedToken) {
        return res.status(401).json({
            message: 'Not logged in'
        })
    }

    // @ts-ignore
    req.userId = decodedToken.userId;
    next();
};