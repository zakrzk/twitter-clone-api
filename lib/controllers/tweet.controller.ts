import {Tweet} from "../models/tweet.model";

export const postAddTweet = (req, res, next) => {

    const value: string = req.body.value;

    req.user
        .createTweet({value: value})
        .then(respond => {
            res.status(201).send(respond);
        }).catch(err => console.log(err));
};

export const getFeed = (req, res, next) => {
    Tweet.findAll({limit: 100, order: 'updatedAt DESC'})
        .then(tweets => {
            res.send(tweets);
        })
        .catch(err => console.log(err));
}