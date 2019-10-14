const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const mongoose = require('./config/database'); //Database configuration
var jwt = require('jsonwebtoken');
const app = express();


app.set('secretKey', 'nodeRestApi'); //jwt secret token


//connecting with mongoDB
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false,
    useNewUrlParser: true
}));

app.get('/', (req, res) => {
    res.json({
        "tutorial": "Start off with API"
    })
});

app.use('/users', users);
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({
            message: "Not found"
        });
    else
        res.status(500).json({
            message: "Something looks wrong :( !!!"
        });
});

app.listen(3000, () => {
    console.log('Server Started');
})