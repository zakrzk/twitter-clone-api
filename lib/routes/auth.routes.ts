import {Router} from 'express';
import {postRegisterUser} from "../controllers/auth.controller";

const router = Router();

router.post('/register', postRegisterUser);


module.exports = router;