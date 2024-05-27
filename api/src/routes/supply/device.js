var express = require('express');
var router = express.Router();
const Device = require('../../controllers/supply/device');


router.get('/', async function (req, res, next) {
  await new Device().getAll(req, res);
});

router.get('/:id', async function (req, res, next) {
  await new Device().getById(req, res);
});

router.get('/asset/:assetId', async function (req, res, next) {
  await new Device().getByAssetId(req, res);
}); 

router.get('/publisher/:publisherId', async function (req, res, next) {
  await new Device().getByPublisherId(req, res);
});

router.post('/', async function (req, res, next) {
  await new Device().create(req, res);
});

router.put('/:id', async function (req, res, next) {
  await new Device().update(req, res);
});

router.delete('/:id', async function (req, res, next) {
  await new Device().delete(req, res);
});

module.exports = router;
