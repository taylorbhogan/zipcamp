const router = require('express').Router();
const { requireAuth } = require('../../utils/auth.js');

// import models from /db so we can use sequelize to query the postgreSQL database **************************************************/
const {
  Spot,
  SpotImage,
  Area,
  State,
  User,
  Tip,
  Adventure,
  ActivitiesToSpot,
  // UserImage
} = require('../../db/models')


const asyncHandler = require('express-async-handler');

const spotValidations = require('../../validations/spots')


// use sequelize to query the postgreSQL database **************************************************/
router.get('/', asyncHandler(async (req, res) => {
  const spots = await Spot.findAll({include: [Area, State, User, SpotImage]});
  res.json(spots);
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const spot = await Spot.findByPk(req.params.id,{
    include: [User, Area, State, SpotImage]
  });
  return res.json(spot);
}));

router.post(
  '/',
  spotValidations.validateCreate,
  asyncHandler(async function (req, res) {
    const formData = req.body
    const spot = await Spot.create(formData)

    const spotIJustCreated = await Spot.findByPk(spot.id, {
      include: User
    })

    res.json(spotIJustCreated)
  })
);

router.put(
  '/:id',
  spotValidations.validateUpdate,
  asyncHandler(async function (req, res) {

    const id = req.body.id;
    delete req.body.id;
    await Spot.update(req.body,
      {where: { id }}
    )
    const spot = await Spot.findByPk(id, {
      include: [User, Area, State]
    })

    return res.json(spot);
  })
);

router.delete('/:id', asyncHandler(async function (req, res) {
  const spotId = req.params.id
  const spot = await Spot.findByPk(spotId);
  if (!spot) throw new Error('Cannot find spot');

  const tips = await Tip.findAll({
    where: {
      spotId
    }
  })

  for (let i = 0; i < tips.length; i++) {
    const tip = tips[i];
    await tip.destroy();
  }

  const adventures = await Adventure.findAll({
    where: {
      spotId
    }
  })

  for (let i = 0; i < adventures.length; i++) {
    const adventure = adventures[i];
    await adventure.destroy();
  }

  const spotImages = await SpotImage.findAll({
    where: {
      spotId
    }
  })

  for (let i = 0; i < spotImages.length; i++) {
    const spotImage = spotImages[i];
    await spotImage.destroy();
  }

  const activitiesToSpots = await ActivitiesToSpot.findAll({
    where: {
      spotId
    }
  })

  for (let i = 0; i < activitiesToSpots.length; i++) {
    const activitiesToSpot = activitiesToSpots[i];
    await activitiesToSpot.destroy();
  }

  const deletedSpot = await Spot.destroy({ where: { id: spotId }});

  res.json(deletedSpot);
}));



module.exports = router;
