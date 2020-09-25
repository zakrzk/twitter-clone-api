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
            .custom((value) => {
                return User.findOne({where: {email: value}}).then(user => {
                    if (user) return Promise.reject()
                })
            })
            .normalizeEmail(),
        body('password')
            .isLength({min: 8})
            .isString()
            .withMessage("Password must be minimum 8 characters long"),
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
        .withMessage("User not registered."),
], postLoginUser);


module.exports = router;