import * as express from 'express';
import {Request, Response, NextFunction} from 'express';

import * as bodyParser from 'body-parser';
import {sequelize} from "./util/database";
import {errorController} from './controllers/error.controller'
import {Tweet} from "./models/tweet.model";
import {User} from "./models/user.model";

const app = express();
const tweetRoutes = require('./routes/tweets.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req: Request, res: Response, next: NextFunction) => {
    User.findByPk(1).then(user => {
        // @ts-ignore I've been trying to fix it with /@types/index.d.ts but unsuccessfully.
        req.user = user;
        next();
    }).catch(err => console.log(err))
});
app.use('/tweet', tweetRoutes);
app.use(errorController);

Tweet.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Tweet);

sequelize.sync({force:true})
    .then(res => {
        return User.findByPk(1)
    }).then(user => {
    if (!user) { // create dummy user
        User.create({
            email: 'test@gmail.com',
            password: 'password',
            name: 'James Bond',
            description: "Big fan of action movies."
        })
    }
    return user;
}).then(user => {
    console.log(user)
    app.listen(3005, () => {
        console.log("server running")
    });
})
    .catch(err => {
        console.log(err)
    });



