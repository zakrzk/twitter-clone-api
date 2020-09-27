import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken';
import {Request, Response} from "express";
import {User} from "../models/user.model";
import {Result, validationResult} from "express-validator/check";

export const postRegisterUser = (req: Request, res: Response) => {

    const errors: Result = validationResult(req);
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
                        message: 'User registered successfully.',
                        email: obj.email,
                        name: obj.name,
                    })
                })
        }).catch(err => console.log(err));

};

export const postLoginUser = (req: Request, res: Response) => {

    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array())
    }

    const email: string = req.body.email;
    const password: string = req.body.password;
    let tempUser;

    User.findOne({where: {email: email}})
        .then(user => {
            tempUser = user;
            bcrypt.compare(password, user.password)
                .then(passMatch => {
                    if (!passMatch) {
                        return res.send({err: 'Email / password did not match.'})
                    }
                    const token = jwt.sign({
                            userId: tempUser.id,
                            email: tempUser.email
                        },
                        process.env.JWT_SECRET,
                        {expiresIn: process.env.JWT_EXPIRY_AGE},
                    );
                    res.status(200).json({userId: tempUser.id, token: token});
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
};

