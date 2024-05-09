var express = require('express');
var router = express.Router();
const Company = require('../../controllers/supply/company');

router.get('/', async (req, res) => {
  const company = new Company();
  await company.getAll(req, res)
});

router.get('/:id', async (req, res) => {
  const company = new Company();
  await company.getById(req, res)
})

router.post('/', async (req, res) => {
  const company = new Company();
  await company.create(req, res)
})

router.put('/:id', async (req, res) => {
  const company = new Company();
  await company.update(req, res)
})

router.delete('/:id', async (req, res) => {
  const company = new Company();
  await company.delete(req, res)
})


module.exports = router;
