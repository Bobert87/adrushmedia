const express = require('express');
const router = express.Router();
const Tag = require('../../controllers/core/tag');

router.get('/', async (req, res) => {
    const tag = new Tag();
    await tag.getAll(req, res)
    });

router.get('/:id', async (req, res) => {
    const tag = new Tag();
    await tag.getById(req, res)
    });    

router.get('/campaign/:campaignId', async (req, res) => {
    const tag = new Tag();
    await tag.getByCampaignId(req, res)
    });

router.get('/campaign/:campaignId/name/:name', async (req, res) => {
    const tag = new Tag();
    await tag.getByCampaignIdAndName(req, res)
    });

router.get('/advertiser/:advertiserId', async (req, res) => {
    const tag = new Tag();
    await tag.getByAdvertiserId(req, res)
    });

router.post('/', async (req, res) => {
    const tag = new Tag();
    await tag.create(req, res)
    });

router.put('/:id', async (req, res) => {
    const tag = new Tag();
    await tag.update(req, res)
    });

router.delete('/:id', async (req, res) => {
    const tag = new Tag();
    await tag.delete(req, res)
    });

module.exports = router;