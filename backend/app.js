const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const routes = require('./routes')

const app = express();

/************************MIDDLEWARE-START************************/
// middleware for logging info about requests and responses
app.use(morgan('dev'))
// middleware for parsing cookies and JSON bodies of requests of Content-Type app/json
app.use(cookieParser())
app.use(express.json())
// security middleware
if (!isProduction) {
  // enable cors only in development because React frontend will be served from a different server than the Express server. CORS isn't needed in production since all of our React and Express resources will come from same origin
  app.use(cors());
}
// helmet helps set a variety of headers to better secure your app
// for more info: https://www.npmjs.com/package/helmet
app.use(helmet({
  // disabled because React is generally safe at mitigating Cross-Site Scripting
  // for more info: https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting
  contentSecurityPolicy: false
}));

// Set the _csrf token and create req.csrfToken method
// adds a method on all requests (req.csrfToken) that will be set to another cookie (XSRF-TOKEN) later on. These two cookies work together to provide CSRF protection. The XSRF-TOKEN cookie value needs to be sent in the header of any request with all HTTP verbs besides GET. This header will be used to validate the _csrf cookie to confirm that the request comes from your site and not an unauthorized site.
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      // can't be read by JavaScript
      httpOnly: true,
    },
  })
  );

  // AFTER all the middlewares
  app.use(routes)
  /************************MIDDLEWARE-END************************/



  module.exports = app;
