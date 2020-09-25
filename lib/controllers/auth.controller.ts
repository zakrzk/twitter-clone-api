import {Request, Response} from "express";
import * as bcrypt from 'bcryptjs'
import {User} from "../models/user.model";
import {validationResult} from "express-validator/check";

export const postRegisterUser = (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array())
    }
    const email: string = req.body.email;
    const password: string = req.body.password;
    const name: string = req.body.name;
    const description: string = req.body.description;

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
                        message: "User registered",
                        email: obj.email,
                        name: obj.name,
                    })
                })
        }).catch(err => console.log(err));

};

export const postLoginUser = (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array())
    }

    const email: string = req.body.email;
    const password: string = req.body.password;

    User.findOne({where: {email: email}})
        .then(user => {
            bcrypt.compare(password, user.password)
                .then(passMatch => {
                    if (!passMatch) {
                        return res.send({err: 'Email / password did not match.'})
                    }
                    res.setHeader('Set-Cookie', 'loggedIn=true');
                    return res.send("Logged in")
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
};