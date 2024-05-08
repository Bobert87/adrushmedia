var express = require('express');
var router = express.Router();


// GET ad by ID
router.get('/:id', function (req, res, next) {
  // Find the ad with the specified ID in the database
  // Send the found ad as a response
});

// POST create ad
router.post('/', function (req, res, next) {
  // Create a new ad in the database using the request body
  // Send the created ad as a response
});

// PUT update ad by ID
router.put('/:id', function (req, res, next) {
  // Update the ad with the specified ID in the database using the request body
  // Send the updated ad as a response
});

// DELETE ad by ID
router.delete('/:id', function (req, res, next) {
  // Delete the ad with the specified ID from the database
  // Send a success message as a response
});

module.exports = router;
