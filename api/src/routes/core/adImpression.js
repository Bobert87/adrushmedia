const express = require("express");
const router = express.Router();
const AdImpression = require("../../controllers/core/adImpression");

router.get("/:deviceId/:adId/:lat-:lng", async (req, res) => {
	const adImpression = new AdImpression();
	await adImpression.getAll(req, res);
});

module.exports = router;
