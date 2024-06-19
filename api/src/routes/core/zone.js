const express = require("express");
const router = express.Router();
const Zone = require("../../controllers/core/zone");

router.get("/", async (req, res) => {
	const zone = new Zone();
	await zone.getAll(req, res);
});

router.get("/:id", async (req, res) => {
	const zone = new Zone();
	await zone.getById(req, res);
});

router.get("/name/:name", async (req, res) => {
	const zone = new Zone();
	await zone.getByName(req, res);
});

router.post("/", async (req, res) => {
	const zone = new Zone();
	await zone.create(req, res);
});

router.put("/:id", async (req, res) => {
	const zone = new Zone();
	await zone.update(req, res);
});

router.delete("/:id", async (req, res) => {
	const zone = new Zone();
	await zone.delete(req, res);
});

module.exports = router;
