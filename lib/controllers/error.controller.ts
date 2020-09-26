import {Request, Response} from "express";

export const errorController = (req: Request, res: Response) => {
    res.status(404).send({err: '404 not found'})
};