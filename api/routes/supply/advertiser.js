var express = require('express');
var router = express.Router();
const Advertiser = require('../../controllers/supply/advertiser');

// GET all resources
router.get('/', async (req, res) => {
  const advertiser = new Advertiser();
  await advertiser.getAll(req,res)
});

// GET a specific resource
router.get('/:id', async (req, res) => {
  const advertiser = new Advertiser();
  await advertiser.getById(req,res)
});

// POST a new resource
router.post('/', async (req, res) => {
  const advertiser = new Advertiser();
  await advertiser.create(req,res)
});

// PUT/UPDATE an existing resource
router.put('/:id', async (req, res) => {
  const advertiser = new Advertiser();
  await advertiser.update(req,res)
});

// DELETE a resource
router.delete('/:id', async (req, res) => {
  const advertiser = new Advertiser();
  await advertiser.delete(req,res)
});

module.exports = router;