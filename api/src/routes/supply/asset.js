const express = require("express");
const router = express.Router();
const Asset = require("../../controllers/supply/asset");

router.get("/", async (req, res) => {
	const asset = new Asset();
	await asset.getAll(req, res);
});

router.get("/:id", async (req, res) => {
	const asset = new Asset();
	await asset.getById(req, res);
});

router.get("/publisher/:publisherId", async (req, res) => {
	const asset = new Asset();
	await asset.getByPublisherId(req, res);
});

router.post("/", async (req, res) => {
	const asset = new Asset();
	await asset.create(req, res);
});

router.put("/:id", async (req, res) => {
	const asset = new Asset();
	await asset.update(req, res);
});

router.delete("/:id", async (req, res) => {
	const asset = new Asset();
	await asset.delete(req, res);
});

module.exports = router;
