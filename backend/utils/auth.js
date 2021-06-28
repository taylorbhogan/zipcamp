const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// set the JWT cookie after a user is logged in or signed up. will be used in login and signup routes.
// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
  // Create the token.
  const token = jwt.sign(
    // payload of JWT is return of the User instance method .toSafeObj
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) }, // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

// Certain authenticated routes require the identity of the current session user.
// restureUser restores the session user based on the contents of the JWT cookie.
// this will be added as pre-middleware for route handlers and for the following auth middleware.
const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      // this scope is fine because hashedPassword is not needed for this query.
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

// require a session user to be authenticated before accessing a route.
// If there is no current user, return an error.
const requireAuth = [
  // ensure that if a valid JWT cookie exists, the session user will be loaded into the req.user attribute.
  restoreUser,
  // check req.user and will go to the next middleware if there is a session user present there.
  function (req, res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
    // return res.redirect('/');
  },
];

module.exports = { setTokenCookie, restoreUser, requireAuth };
