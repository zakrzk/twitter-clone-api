import {Request, Response} from 'express';
import {Tweet} from "../models/tweet.model";
import {User} from "../models/user.model";
import * as jwt from "jsonwebtoken";
import {validationResult} from "express-validator";

export const postAddTweet = (req: Request, res: Response) => {

    let value: string = req.body.value;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array())
    }
    const token: string = req.get('Authentication').split(' ')[1];
    //todo export to .env
    const decodedToken = jwt.verify(token, 'secret123');

    // @ts-ignore
    User.findByPk(decodedToken.userId).then(user => user.createTweet({value: value}))
        .then(() => {
            res.sendStatus(201);
        }).catch(err => console.log(err));
};

export const getFeed = (req: Request, res: Response) => {
    Tweet.findAll({
        limit: 100,
        order: [['updatedAt', 'DESC']],
        include: [{
            model: User,
            as: User.name,
            attributes: ['name']
        }],
        attributes: ['value', 'createdAt'],
    })
        .then(tweets => {
            res.send(tweets);
        })
        .catch(err => console.log(err));
};

export const deleteTweet = (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array())
    }

    const tweetId: number = req.body.tweetId;
    Tweet.findByPk(tweetId).then(tweetObj => {

        // @ts-ignore
        if (tweetObj.userId !== req.userId) {
            res.status(401).json({err: 'Unauthorized. Your\'e not the author of this tweet.'})
        }

        // check if it's within 3 minutes
        const createdAt: number = new Date(tweetObj['dataValues'].createdAt).getTime();
        const diffTimeMs: number = Date.now() - createdAt;
        if (diffTimeMs > 3 * 60 * 1000) {
            res.status(400).send('Too late!');
        } else {
            Tweet.destroy({where: {id: tweetId}});
            res.status(204).send('Tweet deleted.');
        }
    }).catch(err => console.log(err))
};