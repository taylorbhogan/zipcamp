const router = require("express").Router();

const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots.js");
const areasRouter = require("./areas.js");
const statesRouter = require("./states.js");
const tipsRouter = require("./tips.js");
const mapsRouter = require("./maps");
const designationsRouter = require("./designations");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/spots", spotsRouter);
router.use("/areas", areasRouter);
router.use("/states", statesRouter);
router.use("/tips", tipsRouter);
router.use("/maps", mapsRouter);
router.use("/designations", designationsRouter);

/************************TESTS************************/

// TEST 4 - requireAuth
// GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// TEST 3 - restoreUser
// GET /api/restore-user
// const { restoreUser } = require('../../utils/auth.js');
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// TEST 2 - setTokenCookie
// GET /api/set-token-cookie
// const asyncHandler = require('express-async-handler');
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       },
//     })
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

// TEST 1
// test fetch request for the browser - entered into browser console to test
// fetch('/api/test', {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `4YIX40Ur-xrgosPUzItYfVxcDJ_HwmsBBpMQ`
//   },
//   body: JSON.stringify({ hello: 'world' })
// }).then(res => res.json()).then(data => console.log(data));

// TEST 0 - test the API router
// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });

module.exports = router;
