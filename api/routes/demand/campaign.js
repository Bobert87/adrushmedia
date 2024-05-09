var express = require('express');
var router = express.Router();
const Campaign = require('../../controllers/demand/campaign');

router.get('/', async (req, res) => {
  const campaign = new Campaign();
  await campaign.getAll(req, res)
});

router.get('/:id', async (req, res) => {
  const campaign = new Campaign();
  await campaign.getById(req, res)
})

router.post('/', async (req, res) => {
  const campaign = new Campaign();
  await campaign.create(req, res)
})

router.put('/:id', async (req, res) => {
  const campaign = new Campaign();
  await campaign.update(req, res)
})

router.delete('/:id', async (req, res) => {
  const campaign = new Campaign();
  await campaign.delete(req, res)
})

router.get('/advertiser/:advertiserId', async (req, res) => {
  const campaign = new Campaign();
  await campaign.getByAdvertiserId(req, res)
})

module.exports = router;
