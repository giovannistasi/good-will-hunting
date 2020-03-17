'use strict';
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    db.users.findOne({
      where: { email: email },
    }).then(user => {
      if (!user) {
        return done(null, false, { message: 'This email has not been recognised' });
      }
      bcrypt.compare(password, user.passhash, (err, same) => {
        if (err) throw err;
        if (same) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      });
    })
      .catch(err => console.log(err));
  })
);

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser((id, done) => {
  db.users.findByPk(id, (err, user) => {
    done(err, user);
  });
});

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'secret'
}));
app.use(passport.initialize());
app.use(passport.session());

const db = require('./models');
const router = require('./router.js');

app.use(cors());
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
