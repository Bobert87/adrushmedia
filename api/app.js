var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var advertiserRouter = require('./routes/demand/advertiser');
var campaignRouter = require('./routes/demand/campaign');
var adRouter = require('./routes/demand/ad');

var deviceRouter = require('./routes/supply/device');
var vehicleRouter = require('./routes/supply/vehicle');
var companyRouter = require('./routes/supply/company');

var tagRouter = require('./routes/core/tag');
var polygonRouter = require('./routes/core/polygon');
var polygonGroupRouter = require('./routes/core/polygonGroup');
var scheduleRouter = require('./routes/core/schedule');
const loggerColorConfig = require('./config/config');

var app = express();

app.use(logger(loggerColorConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const t = path.join(__dirname, 'public');
app.use(express.static(t));

app.use('/advertiser', advertiserRouter);
app.use('/campaign', campaignRouter);
app.use('/ad', adRouter);

app.use('/device', deviceRouter);
app.use('/vehicle', vehicleRouter);
app.use('/company', companyRouter);

app.use('/tag', tagRouter);
app.use('/polygon', polygonRouter);
app.use('/polygonGroup', polygonGroupRouter);
app.use('/schedule', scheduleRouter);


module.exports = app;