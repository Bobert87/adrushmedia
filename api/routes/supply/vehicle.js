var express = require('express');
var router = express.Router();
const Vehicle = require('../../controllers/supply/vehicle');

router.get('/', async (req, res) => {
  const vehicle = new Vehicle();
  await vehicle.getAll(req, res)
});

router.get('/:id', async (req, res) => {
  const vehicle = new Vehicle();
  await vehicle.getById(req, res)
})

router.post('/', async (req, res) => {
  const vehicle = new Vehicle();
  await vehicle.create(req, res)
})

router.put('/:id', async (req, res) => {
  const vehicle = new Vehicle();
  await vehicle.update(req, res)
})

router.delete('/:id', async (req, res) => {
  const vehicle = new Vehicle();
  await vehicle.delete(req, res)
})

router.get('/company/:companyId', async (req, res) => {
  const vehicle = new Vehicle();
  await vehicle.getByCompanyId(req, res)
})

router.get('/driver/:driverId', async (req, res) => {
  const vehicle = new Vehicle();
  await vehicle.getByDriverId(req, res)
})



module.exports = router;
