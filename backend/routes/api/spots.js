// WE ARE IN THE BACKEND - THIS IS EXPRESS, RUN BY NODE.
// this is the end of the code road. we use this file to contact our database.
// the requests to these routes come from the store in the frontend
// we connect these routes to our app using api/index.js

// create router
const router = require('express').Router();

// import models from /db so we can use sequelize to query the postgreSQL database **************************************************/
const {
  Spot,
  Area,
  State,
  User
} = require('../../db/models')

// import middleware **********************************************************/

const asyncHandler = require('express-async-handler');

// extra functions


// use sequelize to query the postgreSQL database **************************************************/

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

router.post(
  '/',
  // pokemonValidations.validateCreate,
  asyncHandler(async function (req, res) {
    const formData = req.body
    const spot = await Spot.create(formData)
    console.log("---------------------------> backend");
    res.json(spot)
    // const id = await createSpot(req.body);
    // return res.redirect(`${req.baseUrl}/${id}`);
  })
);

router.put(
  '/:id',
  // pokemonValidations.validateUpdate,
  asyncHandler(async function (req, res) {

    const id = req.body.id;
    delete req.body.id;
    await Spot.update(req.body,
      {where: { id }}
    )
    const spot = await Spot.findByPk(id);

    return res.json(spot);
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
