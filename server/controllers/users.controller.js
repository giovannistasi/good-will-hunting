'use strict';

const db = require('../models');
const bcrypt = require('bcryptjs');

exports.getAll = async (req, res) => {
  try {
    const users = await db.users.findAll({
      include: [
        {
          model: db.skills,
        },
        {
          model: db.listings,
        }
      ]
    })
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, password2, address, picture } = req.body;
  let errors = [];
  try {
    if (!firstName || !lastName || !password || !password2 || !email) {
      errors.push({ msg: 'Please fill in all fields' });
    }
    if (password !== password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
    if (password.length < 6) {
      errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
      res.send(errors)
    } else {
      db.users.findOne({
        where: { email: email },
      }).then(user => {
        if (user) {
          errors.push({ msg: 'Email is already registered' })
          console.log('emailerror');
          res.send(errors);
        } else {
          const newUser = { firstName, lastName, email, address, picture }
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              newUser.passhash = hash;
              db.users.create(newUser);
              res.json(newUser);
              res.status = 200;
            })
          })
        }
      });
    }
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};

exports.login = async (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/myprofile',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
}

exports.logout = (req, res) => {
  req.logout();
  req.send('Successfully logged out');
  res.redirect('login');
};