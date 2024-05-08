var express = require('express');
var router = express.Router();
const Campaign = require('../../controllers/supply/campaign');

/* GET home page. */
router.get('/', async (req, res) => {
  const campaign = new Campaign();
  await campaign.getAll(req, res)
});

router.get('/:id', async (req, res) => {
  const campaign = new Campaign();
  await campaign.getById(req, res)
})

module.exports = router;
