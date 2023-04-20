const express = require('express');


require('../database/mongodb');
const originConfig = require("../config/cors");
const apiRouter = require('../routes/api.route');
const errorCallBack = require('../config/error-callback');



const app = express();
app.use(express.static('public'));
app.use(originConfig);
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json({
    limit: '100mb'
}));


app.use(apiRouter);

app.use(errorCallBack());

module.exports = app;