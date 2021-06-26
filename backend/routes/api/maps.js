const router = require('express').Router();
const { googleMapsAPIKey } = require('../../config');

// can I apply validating middleware to ensure that only users of my application are able to retrieve this key?
router.post('/key', (req, res) => {
  res.json({ googleMapsAPIKey });
});

module.exports = router;
