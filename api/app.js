var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var advertiserRouter = require('./routes/demand/advertiser');
var campaignRouter = require('./routes/demand/campaign');
var adRouter = require('./routes/demand/ad');
var carRouter = require('./routes/supply/car');
var companyRouter = require('./routes/supply/company');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const t = path.join(__dirname, 'public');
app.use(express.static(t));

app.use('/ad', adRouter);
app.use('/advertiser', advertiserRouter);
app.use('/campaign', campaignRouter);

app.use('/car', carRouter);
app.use('/company', companyRouter);

module.exports = app;
