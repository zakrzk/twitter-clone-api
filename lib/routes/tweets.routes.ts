import {Router} from 'express';
import {body} from 'express-validator/check';
import {getFeed, postAddTweet, deleteTweet} from '../controllers/tweet.controller';
import {Tweet} from "../models/tweet.model";

const router = Router();

router.post('/add', [
    body('value')
        .isString()
        .trim()
        .isLength({min: 1, max: 255})
        .withMessage('Tweet\'s length must be between 1 and 255 characters.')
], postAddTweet);

router.delete('/delete', [
    body('tweetId')
        .exists()
        .custom((value) => typeof value === 'number')
        .withMessage('TweetId must be type of number')
        .bail()
        .custom((value) => {
            return Tweet.findOne({where: {id: value}}).then(tweet => {
                if (!tweet) return Promise.reject()
            })
        })
        .withMessage('Tweet does not exist')
], deleteTweet);

router.get('/feed', getFeed);
module.exports = router;