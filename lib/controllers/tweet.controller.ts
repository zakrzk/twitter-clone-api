import {Tweet} from "../models/tweet.model";

export const postAddTweet = (req, res, next) => {

    const user_id: number = req.body.user_id;
    const value: string = req.body.value;

    Tweet.create({
        user_id: user_id,
        value: value
    }).then(respond => {
        res.status(201).send(respond);
    }).catch(err => console.log(err));
};

export const getFeed = (req, res, next) => {
    Tweet.findAll().then(tweets => {
        res.send(tweets);
    }).catch(err => console.log(err));
}