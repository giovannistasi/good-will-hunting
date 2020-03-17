'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const session = require('express-session');
const passport = require('passport');

require('./config/passport')(passport)

app.use(session({ resave: true, saveUninitialized: true, secret: 'secret' }))
app.use(passport.initialize())
app.use(passport.session())

const db = require('./models');
const router = require('./router.js');

app.use(cors())
app.use(bodyParser.json());
app.use(router);

(async () => {
  try {
    await db.sequelize.sync(); // { force: true }
    const port = 8000;
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the db', error);
  }
})();
