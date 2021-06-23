const express = require('express')
const router = express.Router();

// import DB
const {
  Spot,
  Area,
  State,
  User
} = require('../../db/models')

// import middleware
const asyncHandler = require('express-async-handler');

// API route
// router.get('/', asyncHandler(async (req, res) => {
//   const spots = await Area.findByPk(2);
//   console.log("BACKEND CONSOLE SPOTS",spots);
//   res.json(spots);
// }))
// //
// router.get('/', asyncHandler(async (req, res) => {
//   const spots = await Spot.findAll({include: Area});
//   res.json(spots);
// }))
// router.get('/', asyncHandler(async (req, res) => {
//   const areas = await Area.findAll();
//   res.json(areas);
// }))
router.get('/', asyncHandler(async (req, res) => {
  const spots = await Spot.findAll({include: [Area, State]});
  res.json(spots);
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const spot = await Spot.findByPk(req.params.id,{
    include: User
  });
  return res.json(spot);
}));


module.exports = router;
