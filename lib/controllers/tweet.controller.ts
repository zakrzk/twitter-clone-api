import {Request, Response, NextFunction} from 'express';
import {Tweet} from "../models/tweet.model";

export const postAddTweet = (req: Request, res: Response, next: NextFunction) => {

    let value: string = req.body.value;
    if (value) value = value.trim();

    if (!value || value.length === 0 || value.length > 255) {
        res.status(400).send("Tweet's length must be between 1 and 255 characters.");
        return;
    }
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