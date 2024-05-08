var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var advertiserRouter = require('./routes/supply/advertiser');
var campaignRouter = require('./routes/supply/campaign');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const t = path.join(__dirname, 'public');
app.use(express.static(t));

app.use('/advertiser', advertiserRouter);
app.use('/campaign', campaignRouter);

module.exports = app;
