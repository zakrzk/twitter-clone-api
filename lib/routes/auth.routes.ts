import {Router} from 'express';
import {postRegisterUser, postLoginUser} from "../controllers/auth.controller";

import {body} from 'express-validator/check';
import {User} from "../models/user.model";

const router = Router();

router.post('/register', [
        body('email')
            .isEmail()
            .withMessage("Email not valid")
            .bail()
            .normalizeEmail()
            .custom((value) => {
                return User.findOne({where: {email: value}}).then(user => {
                    if (user) return Promise.reject()
                })
            })
            .withMessage('Email already registered.'),
        body('password')
            .exists()
            .isLength({min: 8, max: 64})
            .isString()
            .withMessage('Password must be between 8 and 64 characters long'),
        body('passwordConfirmation')
            .exists()
            .custom((value, {req}) => value === req.body.password)
            .withMessage('Password and password confirmation must be the same.'),
        body('name')
            .exists()
            .isString()
            .bail()
            .trim()
            .withMessage('Name must not be empty.'),
        body('description').trim()

    ],
    postRegisterUser);

router.post('/login', [
    body('email')
        .isEmail()
        .normalizeEmail()
        .custom((value) => {
            return User.findOne({where: {email: value}}).then(user => {
                if (!user) return Promise.reject()
            })
        })
        .withMessage("User not registered.")
], postLoginUser);

module.exports = router;