import * as express from 'express';
import * as session from 'express-session';
import * as jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import * as bodyParser from 'body-parser';
import {sequelize} from "./util/database";
import {errorController} from './controllers/error.controller'
import {Tweet} from "./models/tweet.model";
import {User} from "./models/user.model";

const app = express();
const authRoutes = require('./routes/auth.routes');
const tweetRoutes = require('./routes/tweets.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: '123123',
    resave: false,
    saveUninitialized: false
})); //todo export to .env

app.use('/tweet', tweetRoutes);
app.use('/auth', authRoutes);
app.use(errorController);
app.use((error, req, res) => {
    console.log(error);
    // @ts-ignore
    res.status(400).send(error.toString())
});

Tweet.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE' // also delete all user's tweets
});
User.hasMany(Tweet);

sequelize
    .sync({force: true})
    .then(() => {
        app.listen(3005, () => {
            console.log("server running")
        });
    }).catch(err => {
    console.log(err)
});



