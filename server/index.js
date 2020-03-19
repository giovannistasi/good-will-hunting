'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const router = require('./router.js');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const initialisePassport = require('./config/passport-config');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'secret' // store in env
}));

initialisePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

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
