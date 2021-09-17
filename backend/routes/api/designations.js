const express = require('express')
const router = express.Router();

const { Designation } = require('../../db/models')

const asyncHandler = require('express-async-handler');


router.get('/', asyncHandler(async (req, res) => {
  const designations = await Designation.findAll();
  res.json(designations);
}))

module.exports = router;
