var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var advertiserRouter = require('./routes/demand/advertiser');
var campaignRouter = require('./routes/demand/campaign');
var adRouter = require('./routes/demand/ad');

var deviceRouter = require('./routes/supply/device');
var assetRouter = require('./routes/supply/asset');

var tagRouter = require('./routes/core/tag');
var polygonRouter = require('./routes/core/polygon');
var scheduleRouter = require('./routes/core/schedule');
var zoneRouter = require('./routes/core/zone');

const loggerColorConfig = require('./config/loggerConfig');

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
app.use('/asset', assetRouter);

app.use('/tag', tagRouter);
app.use('/polygon', polygonRouter);
app.use('/zone', zoneRouter);

app.use('/schedule', scheduleRouter);


module.exports = app;