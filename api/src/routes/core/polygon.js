var express = require('express');
var router = express.Router();
const Polygon = require('../../controllers/core/polygon');


router.get('/', async (req, res) => {
    const polygon = new Polygon();
    await polygon.getAll(req, res)
});

router.get('/:id', async (req, res) => {
    const polygon = new Polygon();
    await polygon.getById(req, res)
});

router.get('/zone/:zoneId', async (req, res) => {
    const polygon = new Polygon();
    await polygon.getByZoneId(req, res)
});

router.get('/zone/name/:name', async (req, res) => {
    const polygon = new Polygon();
    await polygon.getByZoneName(req, res)
});

router.post('/', async (req, res) => {
    const polygon = new Polygon();
    await polygon.create(req, res)
});

router.put('/:id', async (req, res) => {
    const polygon = new Polygon();
    await polygon.update(req, res)
});

router.delete('/:id', async (req, res) => {
    const polygon = new Polygon();
    await polygon.delete(req, res)
});

module.exports = router;
