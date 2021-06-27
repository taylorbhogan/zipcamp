const express = require('express')
const router = express.Router();

const { Area, State } = require('../../db/models')

const asyncHandler = require('express-async-handler');


router.get('/', asyncHandler(async (req, res) => {
  const areas = await Area.findAll({include: State});
  res.json(areas);
}))



// router.get('/', asyncHandler(async (req, res) => {
//   const spots = await Spot.findAll({include: [Area, State]});
//   res.json(spots);
// }))

module.exports = router;
