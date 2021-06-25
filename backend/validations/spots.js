const { check } = require('express-validator')
const { handleValidationErrors } = require('./utils')

const id = check('id')
.notEmpty()
.isInt({ min: 0 })
.withMessage('inside backend...validations...spots')
// could I go further and validate that it's in the db here?

const name = check('name')
  .notEmpty()
  .withMessage('name: please enter a name[inside backend...validations...spots]')

const lat = check('lat')
  .notEmpty()
  .withMessage('lat: please enter a latitude[inside backend...validations...spots]')
  .isDecimal({decimal_digits: '0,6'})
  .withMessage('lat: please provide a valid latitude [inside backend...validations...spots]')

  const long = check('long')
  .notEmpty()
  .withMessage('long: please enter a longitude[inside backend...validations...spots]')
  .isDecimal({decimal_digits: '0,6'})
  .withMessage('long: please provide a valid longitude [inside backend...validations...spots]')

  const blurb = check('blurb')
  .notEmpty()
  .withMessage('blurb: you gotta give us a LITTLE something[inside backend...validations...spots]')
  .withMessage('inside backend...validations...spots')

  const areaId = check('areaId')
  .notEmpty()
  .isInt({ min: 0 })
  .withMessage('inside backend...validations...spots')

const stateId = check('stateId')
  .notEmpty()
  .isInt({ min: 0 })
  .withMessage('inside backend...validations...spots')


exports.validateCreate = [
  lat,
  long,
  name,
  blurb,
  areaId,
  stateId,
  handleValidationErrors
]

exports.validateUpdate = [
  id,
  lat,
  long,
  name,
  blurb,
  areaId,
  stateId,
  handleValidationErrors
]
