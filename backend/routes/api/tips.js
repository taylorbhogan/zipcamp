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
  User,
  Tip
} = require('../../db/models')

// import middleware **********************************************************/

const asyncHandler = require('express-async-handler');

// import other stuff
// const spotValidations = require('../../validations/spots')


// use sequelize to query the postgreSQL database **************************************************/

router.get('/', asyncHandler(async (req, res) => {
  const tips = await Tip.findAll({include: [ User, Spot ]});
  res.json(tips);
}))

router.post(
  '/',
  // spotValidations.validateCreate,
  asyncHandler(async function (req, res) {
    const formData = req.body
    const tip = await Tip.create(formData)
    const tipIJustCreated = await Tip.findByPk(tip.id, {
      include: [User, Spot]
    })
    res.json(tipIJustCreated)
  })
);

router.put(
  '/:id',
  // spotValidations.validateUpdate,
  asyncHandler(async function (req, res) {

    const id = req.body.id;
    delete req.body.id;
    await Tip.update(req.body,
      {where: { id }}
    )
    const tip = await Tip.findByPk(id, {
      include: [User, Spot]
    })

    return res.json(tip);
  })
);

router.delete('/:id', asyncHandler(async function (req, res) {
  console.log('------inside the delete route');
  // const {spotId} = req.body.spotId
  // the below works; I'm curious if I can use the body for the same purpose
  const tipId = req.params.id
  const tip = await Tip.findByPk(tipId);
  if (!tip) throw new Error('Cannot find tip');
  const deletedTip = await Tip.destroy({ where: { id: tipId }});

  console.log('this is deletedTip ==========>', deletedTip);
  // return res.json('successfully deleted spot.....presumedly. check postbird');
  // return res.json({ spotId });
  res.json(deletedTip);
}));

module.exports = router;
