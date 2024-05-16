var express = require('express');
var router = express.Router();
const PolygonGroup = require('../../controllers/core/polygonGroup');

router.get('/', async (req, res) => {
    const polygonGroup = new PolygonGroup();
    await polygonGroup.getAll(req, res)
    }
);

router.get('/:id', async (req, res) => {
    const polygonGroup = new PolygonGroup();
    await polygonGroup.getById(req, res)
    }
);

router.get('/name/:name', async (req, res) => {
    const polygonGroup = new PolygonGroup();
    await polygonGroup.getByName(req, res)
    }
);

router.post('/', async (req, res) => {
    const polygonGroup = new PolygonGroup();
    await polygonGroup.create(req, res)
    }
);

router.put('/:id', async (req, res) => {
    const polygonGroup = new PolygonGroup();
    await polygonGroup.update(req, res)
    }
);

router.delete('/:id', async (req, res) => {
    const polygonGroup = new PolygonGroup();
    await polygonGroup.delete(req, res)
    }
);

module.exports = router;
