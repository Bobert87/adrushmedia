var express = require('express');
var router = express.Router();
const Device = require('../../controllers/supply/device');


router.get('/', async (req, res) => {
  const device = new Device();
  await device.getAll(req, res)
});

router.get('/:id', async (req, res) => {
  const device = new Device();
  await device.getById(req, res)
})

router.post('/', async (req, res) => {
  const device = new Device();
  await device.create(req, res)
})

router.put('/:id', async (req, res) => {
  const device = new Device();
  await device.update(req, res)
})

router.delete('/:id', async (req, res) => {
  const device = new Device();
  await device.delete(req, res)
})

router.get('/company/:companyId', async (req, res) => {
  const device = new Device();
  await device.getByCompanyId(req, res)
})

router.get('/driver/:driverId', async (req, res) => {
  const device = new Device();
  await device.getByDriverId(req, res)
})

router.get('/vehicle/:vehicleId', async (req, res) => {
  const device = new Device();
  await device.getByVehicleId(req, res)
})


module.exports = router;
