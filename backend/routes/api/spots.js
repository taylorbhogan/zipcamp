const express = require('express')
const router = express.Router();

// import DB
const { Spot, Area } = require('../../db/models')

// import middleware
const asyncHandler = require('express-async-handler');


// API route
router.get('/', asyncHandler(async (req, res) => {
  const spots = await Spot.findAll({include: Area});
  res.json(spots);
}))




module.exports = router;
