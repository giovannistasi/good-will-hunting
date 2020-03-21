'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const router = require('./router.js');
const passport = require('passport');
const session = require('express-session');
const initialisePassport = require('./config/passport-config');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 7200000, httpOnly: false },
  secret: 'secret', // store in env,
}));

initialisePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

(async () => {
  try {
    await db.sequelize.sync(); // { force: true }
    const port = 8080;  // store in env
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the db', error);
  }
})();
