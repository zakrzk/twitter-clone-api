import * as express from 'express';
import * as bodyParser from 'body-parser';
import {sequelize} from "./util/database";
import {errorController} from './controllers/error.controller'
import {Tweet} from "./models/tweet.model";
import {User} from "./models/user.model";
const app = express();
const tweetRoutes = require('./routes/tweets.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/tweet', tweetRoutes);
app.use(errorController);

Tweet.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Tweet);

sequelize.sync({force: true}).then(res => {
    // console.log(res)
}).catch(err => {
    console.log(err)
})

app.listen(3005, () => {
    console.log("server running")
});

