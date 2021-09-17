const express = require('express')
const router = express.Router();

const { Area, State } = require('../../db/models')

const asyncHandler = require('express-async-handler');


router.get('/', asyncHandler(async (req, res) => {
  const areas = await Area.findAll({include: State});
  res.json(areas);
}))

router.post('/search', asyncHandler(async function (req, res) {
  const designationId = req.body.designation;
  const stateId = req.body.location;

  let filteredAreas;
  if (designationId && !stateId){
    filteredAreas = await Area.findAll({
      where: { designationId },
      include: State
    })
  }

  if (stateId && !designationId){
    filteredAreas = await Area.findAll({
      where: { stateId },
      include: State
    })
  }

  if (stateId && designationId) {
    filteredAreas = await Area.findAll({
      where: { stateId, designationId },
      include: State
    })
  }

  res.json(filteredAreas)
}))



// router.get('/', asyncHandler(async (req, res) => {
//   const spots = await Spot.findAll({include: [Area, State]});
//   res.json(spots);
// }))

module.exports = router;
