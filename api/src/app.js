//const scheduledTasks = require("./scheduled/scheduler");
const express = require("express");
const cookieParser = require("cookie-parser");

const advertiserRouter = require("./routes/demand/advertiser");
const campaignRouter = require("./routes/demand/campaign");
const adRouter = require("./routes/demand/ad");

const deviceRouter = require("./routes/supply/device");
const assetRouter = require("./routes/supply/asset");

const tagRouter = require("./routes/core/tag");
const polygonRouter = require("./routes/core/polygon");
const scheduleRouter = require("./routes/core/schedule");
const adImpressionRouter = require("./routes/core/adImpression");
const zoneRouter = require("./routes/core/zone");

const campaignStatusUpdateRouter = require("./routes/scheduled/scheduled");

const { logger, webLogger } = require("./utils/loggers");

const app = express();

app.use(webLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

logger.info("Starting API Server");
//logger.info(`${scheduledTasks.length} scheduled tasks running`);
app.use("/advertiser", advertiserRouter);
app.use("/campaign", campaignRouter);
app.use("/ad", adRouter);

app.use("/device", deviceRouter);
app.use("/asset", assetRouter);

app.use("/tag", tagRouter);
app.use("/polygon", polygonRouter);
app.use("/zone", zoneRouter);

app.use("/schedule", scheduleRouter);
app.use("/impression", adImpressionRouter);

app.use("/updateCampaigns", campaignStatusUpdateRouter);

module.exports = app;