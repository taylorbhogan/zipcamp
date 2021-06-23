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

// extra functions
// async function update(details) {
//   const id = details.id;
//   delete details.id;
//   await Spot.update(
//     details,
//     {
//       where: { id },
//       returning: true,
//       plain: true,
//     }
//   );
//   return id;
// }


// async function one(id) {
//   // return await Spot.scope("detailed").findByPk(id);
//   return await Spot.findByPk(id);
// }

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
    include: [User, Area, State]
  });
  return res.json(spot);
}));

async function createSpot(details){
  const spot = await Spot.create(details)
  return spot.id;
}

router.post(
  '/',
  // pokemonValidations.validateCreate,
  asyncHandler(async function (req, res) {
    const id = await createSpot(req.body);
    return res.redirect(`${req.baseUrl}/${id}`);
  })
);

// router.put(
//   '/:id',
//   // pokemonValidations.validateUpdate,
//   asyncHandler(async function (req, res) {
//     const id = await update(req.body);
//     const spot = await one(id);
//     return res.json(spot);
//   })
// );



module.exports = router;
