const express = require("express");
const router = express.Router();
const Device = require("../../controllers/supply/device");

router.get("/", async (req, res) => {
	await new Device().getAll(req, res);
});

router.get("/:id", async (req, res) => {
	await new Device().getById(req, res);
});

router.get("/asset/:assetId", async (req, res) => {
	await new Device().getByAssetId(req, res);
});

router.get("/publisher/:publisherId", async (req, res) => {
	await new Device().getByPublisherId(req, res);
});

router.post("/", async (req, res) => {
	await new Device().create(req, res);
});

router.put("/:id", async (req, res) => {
	await new Device().update(req, res);
});

router.delete("/:id", async (req, res) => {
	await new Device().delete(req, res);
});

module.exports = router;
