const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config(); // This allows us to use variables in .env file through process.env
const isProduction = process.env.NODE_ENV === 'production'; // process.env will be used by heroku to provide configs and NODE_ENV will be set to production there.


const indexRouter = require('./routes/index');
const searchRouter = require('./routes/search');
const businessRouter = require('./routes/business');
const customerRouter = require('./routes/customer');
const reviewRouter = require('./routes/review');
const replyRouter = require('./routes/reply');
const app = express();
var history = require('connect-history-api-fallback');

// set up user session
app.use(session({
    secret: 'K-ovid',
    resave: true,
    saveUninitialized: true
  }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(history());
app.use(express.static(path.join(__dirname, isProduction ? 'dist' : 'public'))); // in Heroku we want dist but for dev we want public so we don't have to rebuild everytime we change something.

// connect url hierarchies to our routers
app.use('/', indexRouter);
app.use('/api/latlong', searchRouter);
app.use('/api/businesses', businessRouter);
app.use('/api/customers', customerRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/replies', replyRouter);

/* GET 404 page. */
app.get('*', (req, res) => {
  res.send("<h1>K-ovid 404</h1> <h2>One is never lost, only found what others have not.</h2>", 404);
});

module.exports = app;
