import * as express from 'express';
import * as bodyParser from 'body-parser';

import {sequlize} from "./util/database";

const app = express();
const tweetRoutes = require('./routes/tweets.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/tweet', tweetRoutes);

sequlize.sync().then(res => console.log(res))
    .catch(err => {
    console.log(err);
})

app.listen(3005, () => {
    console.log("server running")
});

