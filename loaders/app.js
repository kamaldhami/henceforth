//#region <Library Imports>
const express = require('express');
//#endregion

//#region <Project Imports>
require('../database/mongodb');
const originConfig = require("../config/cors");
const apiRouter = require('../routes/api.route');

//#endregion


//#region <Instances>
const app = express();
app.use(express.static('public'));
//#endregion

//#region <Security>
app.use(originConfig);
//#endregion


//#region <Body parser and formdata>
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json({
    limit: '100mb'
}));
//#endregion

// app.use('/public', express.static(path.join('public')));
// app.use(express.static(path.join(__dirname, '../', '')));

app.use(apiRouter);

//#region <Error Handling>



//#endregion

module.exports = app;