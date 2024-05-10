var express = require('express');
var router = express.Router();
const Advertiser = require('../../controllers/demand/advertiser');

router.get('/', async (req, res) => {
  const advertiser = new Advertiser();
  await advertiser.getAll(req,res)
});

router.get('/:id', async (req, res) => {
  const advertiser = new Advertiser();
  await advertiser.getById(req,res)
});

router.post('/', async (req, res) => {
  const advertiser = new Advertiser();
  await advertiser.create(req,res)
});

router.put('/:id', async (req, res) => {
  const advertiser = new Advertiser();
  await advertiser.update(req,res)
});

router.delete('/:id', async (req, res) => {
  const advertiser = new Advertiser();
  await advertiser.delete(req,res)
});

module.exports = router;