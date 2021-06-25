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
    // justin's solve to remove ?
    // make the backend give the data back to the frontend so it only pulls from here rather than looking elsewhere

    const tipIJustCreated = await Tip.findByPk(tip.id, {
      include: [User, Spot]
    })


    console.log("---------------------------> backend"),tipIJustCreated;
    res.json(tipIJustCreated)
    // const id = await createSpot(req.body);
    // return res.redirect(`${req.baseUrl}/${id}`);
  })
);

module.exports = router;
