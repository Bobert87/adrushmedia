var express = require('express');
var router = express.Router();
const Schedule = require('../../controllers/core/schedule');

router.get('/:deviceId/:lat-:lng', async (req, res) => {
    const schedule = new Schedule();
    await schedule.create(req, res);
})

module.exports = router;
