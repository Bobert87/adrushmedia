const express = require("express");
const router = express.Router();
const Invoice = require("../../controllers/core/invoice");

router.get("/", async (req, res) => {
	const invoice = new Invoice();
	await invoice.getAll(req, res);
});

router.get("/:id", async (req, res) => {
	const invoice = new Invoice();
	await invoice.getById(req, res);
});

router.get("/advertiser/:advertiserId", async (req, res) => {
	const invoice = new Invoice();
	await invoice.getByAdvertiserId(req, res);
});

router.get("/date/:from/:to", async (req, res) => {
	const invoice = new Invoice();
	await invoice.getByDateRange(req, res);
});

router.get("/status/:status", async (req, res) => {
	const invoice = new Invoice();
	await invoice.getByStatus(req, res);
});

router.post("/", async (req, res) => {
	const invoice = new Invoice();
	await invoice.create(req, res);
});

module.exports = router;
