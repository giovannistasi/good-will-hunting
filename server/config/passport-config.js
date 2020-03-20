const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const bcrypt = require('bcrypt');

function initialise (passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await db.User.findOne({
      where: { email },
      include: [
        {
          model: db.Skill
        }, {
          model: db.Listing
        }]
    })
    if (!user) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.passhash)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (error) {
      return done(error)
    }
  }

  passport.serializeUser((user, done) => {
    done(null, user.userId);
  });

  passport.deserializeUser((id, done) => {
    db.User.findByPk(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser));

}

module.exports = initialise