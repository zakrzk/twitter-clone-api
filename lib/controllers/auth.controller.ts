import {Request, Response} from "express";
import * as bcrypt from 'bcryptjs'
import {User} from "../models/user.model";

export const postRegisterUser = (req: Request, res: Response) => {

    const email: string = req.body.email;
    const password: string = req.body.password;
    const name: string = req.body.name;
    const description: string = req.body.description;

    User.findOne({where: {email: email}}).then(userObj => {
        if (userObj) {
            return res.status(400).send({err: 'Email already registered.'})
        }
        bcrypt.hash(password, 12)
            .then(hashPass => {
                User.create({
                    email: email,
                    password: hashPass,
                    name: name,
                    description: description
                })
                    .then(obj => {
                        res.status(201).send({
                            email: obj.email,
                            name: obj.name,
                        })
                    })
            }).catch(err => console.log(err));
    })
};