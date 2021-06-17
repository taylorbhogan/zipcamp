const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

/************************LOG IN************************/

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

// Log in route
router.post(
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);
// test 1 in the browser console for the above - on username
// fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `svfSE1j9-xmeObImCo2wsQ0tsZK3vYZ6fhuM`
//   },
//   body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
// }).then(res => res.json()).then(data => console.log(data));

// test 2 - on email
// fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `svfSE1j9-xmeObImCo2wsQ0tsZK3vYZ6fhuM`
//   },
//   body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
// }).then(res => res.json()).then(data => console.log(data));

// test 3 - invalid user
// fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `svfSE1j9-xmeObImCo2wsQ0tsZK3vYZ6fhuM`
//   },
//   body: JSON.stringify({ credential: 'Demo-lition', password: 'Hello World!' })
// }).then(res => res.json()).then(data => console.log(data));

// test 4 - test login validation
// fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `XIIIsUWZ-ThDHimNYWbYAzE1tdF_hcW5P9Fg`
//   },
//   body: JSON.stringify({ credential: '', password: 'password' })
// }).then(res => res.json()).then(data => console.log(data));


/************************LOG OUT************************/
// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// test
// fetch('/api/session', {
//   method: 'DELETE',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `n231JMsF-lZrj0ub-HF2IEG5lQvuhyNbjqg4`
//   }
// }).then(res => res.json()).then(data => console.log(data));


/************************RESTORE SESSION USER************************/

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

module.exports = router;
