import {Request, Response} from "express";

export const sendStatus = (req: Request, res: Response) => {
    res.send({status: 'ok'})
};