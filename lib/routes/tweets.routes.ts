import {Router} from 'express';
import {getFeed, postAddTweet} from '../controllers/tweet.controller'
const router = Router();

router.post('/add', postAddTweet);
router.get('/feed', getFeed);

module.exports = router;