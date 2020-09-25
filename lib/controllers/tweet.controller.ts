import {Request, Response, NextFunction} from 'express';
import {Tweet} from "../models/tweet.model";
import {User} from "../models/user.model";

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
}
export const deleteTweet = (req: Request, res: Response, next: NextFunction) => {
    const tweetId: number = req.body.tweetId;
    // @ts-ignore

    Tweet.findByPk(tweetId).then(token => {

        if (token !== null){
            Tweet.destroy({where: {id: tweetId}});
            res.status(204).send('Tweet deleted.');
        }
        else {
            res.status(400).send(`Tweet with id ${tweetId} not found.`);
        }

    }).catch(err => console.log(err))


    // todo check if it's under 3 minutes
};