const express = require('express');
const app = express();
const config = require('./config/config');
const bodyparser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl);
var itemRouter = require('./src/routes/item.routes');
var userRouter = require('./src/routes/user.routes');

app.use(cors());
app.use(bodyparser.json());
app.use('/item', itemRouter);
app.use('/user', userRouter);

app.listen(config.port, () => {
    console.log('Server running on port:' + config.port);
});