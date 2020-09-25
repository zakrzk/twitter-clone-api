import {Request, Response, NextFunction} from 'express';
import {Tweet} from "../models/tweet.model";

export const postAddTweet = (req: Request, res: Response, next: NextFunction) => {

    const value: string = req.body.value;
    // @ts-ignore
    req.user
        .createTweet({value: value})
        .then(respond => {
            res.sendStatus(201);
        }).catch(err => console.log(err));
};

export const getFeed = (req: Request, res: Response, next: NextFunction) => {
    Tweet.findAll({limit: 100, order: [['updatedAt', 'DESC']]})
        .then(tweets => {
            res.send(tweets);
        })
        .catch(err => console.log(err));
};

export const deleteTweet = (req: Request, res: Response, next: NextFunction) => {
    const tweetId: number = req.body.tweetId;
    // @ts-ignore


    Tweet.destroy({where: {id: tweetId}})

    // todo check if exists, return error if doesn't
    // todo check if it's under 3 minutes
        .then(tweet => tweet !== null).then(res => console.log(res))
        .catch(err => console.log(err))
};