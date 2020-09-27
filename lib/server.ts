import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import {sequelize} from "./util/database";
import {errorController} from './controllers/error.controller'
import {sendStatus} from "./controllers/index.controller";
import {Tweet} from "./models/tweet.model";
import {User} from "./models/user.model";
import {RequestExtended, ResponseExtended} from "../@types";

const app = express();
const authRoutes = require('./routes/auth.routes');
const tweetRoutes = require('./routes/tweets.routes');

const APP_PORT: number = +process.env.APP_PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use('/tweet', tweetRoutes);
app.use('/auth', authRoutes);
app.use('/', sendStatus);
app.use(errorController);
app.use((error, req: RequestExtended, res: ResponseExtended) => {
    console.log(error);
    res.status(400).send(error.toString())
});

Tweet.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE' // also delete all user's tweets
});
User.hasMany(Tweet);

sequelize
    .sync()
    .then(() => {
        app.listen(APP_PORT, () => {
            console.log(`Server running on http://localhost:${APP_PORT}`)
        });
    }).catch(err => {
    console.log(err)
});



