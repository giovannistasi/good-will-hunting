const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const db = require('../models');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      db.users.findAll({
        limit: 1,
        where: { email: email },
        order: [['createdAt', 'DESC']]
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
    done(null, user.user_id);
  });

  passport.deserializeUser((id, done) => {
    db.users.findByPk(id, (err, user) => {
      done(err, user);
    });
  });
}