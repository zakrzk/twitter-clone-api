import {Request, Response} from "express";
import {User} from "../models/user.model";

export const postRegisterUser = (req: Request, res: Response) => {

    const email: string = req.body.email;
    const password: string = req.body.password;
    const name: string = req.body.name;
    const description: string = req.body.description;

    User.findOne({where: {email: email}}).then(userObj => {
        if (userObj) {
            res.status(400).send({err: 'Email already registered.'})
        } else {
            User.create({
                email: email,
                password: password,
                name: name,
                description: description
            }).then(respond => {
                res.status(201).send();
            }).catch(err => console.log(err));

        }

    })
}