const express = require("express");
const router = express.Router();
const CampaignStatusUpdater = require("./../../scheduled/campaignStatusUpdater");

router.get("/", async (req, res) => {
    const campaignStatusUpdater = new CampaignStatusUpdater();
    await campaignStatusUpdater.updateCampaignStatus();
    res.json({ message: "Campaign status updated" });
})

module.exports = router;