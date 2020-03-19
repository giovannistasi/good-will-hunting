'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const router = require('./router.js');
const passport = require('passport');
const session = require('express-session');

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'secret' // store in env
}));
app.use(passport.initialize());
app.use(passport.session());

const initialisePassport = require('./config/passport-config');
initialisePassport(passport);

app.use(router);

(async () => {
  try {
    await db.sequelize.sync(); // { force: true }
    const port = 8000;  // store in env
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the db', error);
  }
})();
