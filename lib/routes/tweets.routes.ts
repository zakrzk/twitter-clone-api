import {Router} from 'express';
import {getFeed, postAddTweet, deleteTweet} from '../controllers/tweet.controller'
const router = Router();

router.post('/add', postAddTweet);
router.get('/feed', getFeed);
router.delete('/delete', deleteTweet);

module.exports = router;