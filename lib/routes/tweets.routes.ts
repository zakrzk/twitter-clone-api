import {Router} from 'express';
import {postAddTweet} from '../controllers/tweet.controller'
const router = Router();

router.post('/add', postAddTweet);


module.exports = router;