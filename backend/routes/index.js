const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

router.get('/hello/world', function(req, res) {
  // set a cookie on the res with the name of CSRF-TOKEN to the value of the req.csrfToken method's return.
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;



