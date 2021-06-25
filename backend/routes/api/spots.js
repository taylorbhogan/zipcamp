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
  const spots = await Spot.findAll({include: [Area, State, User]});
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
    // justin's solve to remove ?
    // make the backend give the data back to the frontend so it only pulls from here rather than looking elsewhere

    const spotIJustCreated = await Spot.findByPk(spot.id, {
      include: User
    })


    console.log("---------------------------> backend");
    res.json(spotIJustCreated)
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
    const spot = await Spot.findByPk(id, {
      include: User
    })

    return res.json(spot);
  })
);

// all we have to do here is get the db to delete the spot
router.delete('/:id', asyncHandler(async function (req, res) {
  console.log('------inside the delete route');
  // const {spotId} = req.body.spotId
  // the below works; I'm curious if I can use the body for the same purpose
  const spotId = req.params.id
  const spot = await Spot.findByPk(spotId);
  if (!spot) throw new Error('Cannot find spot');
  const deletedSpot = await Spot.destroy({ where: { id: spotId }});

  console.log('this is deletedSpot ==========>', deletedSpot);
  // return res.json('successfully deleted spot.....presumedly. check postbird');
  // return res.json({ spotId });
  res.json(deletedSpot);
}));




// async function deleteItem(itemId) {
//   // const item = await Item.findByPk(itemId);
//   if (!item) throw new Error('Cannot find item');

//   await Item.destroy({ where: { id: item.id }});
//   return item.id;
// }


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
