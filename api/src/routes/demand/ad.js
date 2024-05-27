var express = require('express');
var router = express.Router();
const Ad = require('../../controllers/demand/ad');

router.get('/', async (req, res) => {
  const ad = new Ad();
  await ad.getAll(req, res)
});

router.get('/:id', async (req, res) => {
  const ad = new Ad();
  await ad.getById(req, res)
});

router.get('/status/:status', async (req, res) => {
  const campaign = new Ad();
  await campaign.getByStatus(req, res)
});

router.post('/', async (req, res) => {
  const ad = new Ad();
  await ad.create(req, res)
});

router.put('/:id', async (req, res) => {
  const ad = new Ad();
  await ad.update(req, res)
});

router.delete('/:id', async (req, res) => {
  const ad = new Ad();
  await ad.delete(req, res)
});

router.get('/campaign/:campaignId', async (req, res) => {
  const ad = new Ad();
  await ad.getByCampaignId(req, res)
});

router.get('/advertiser/:advertiserId', async (req, res) => {
  const ad = new Ad();
  await ad.getByAdvertiserId(req, res)
});

module.exports = router;
