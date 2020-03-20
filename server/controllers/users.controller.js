'use strict';

const db = require('../models');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.getAll = async (req, res) => {
  try {
    const users = await db.User.findAll({
      include: [
        {
          model: db.Skill,
        },
        {
          model: db.Listing,
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
  console.log(req.body);

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
      db.User.findOne({
        where: { email: email },
      }).then(user => {
        if (user) {
          errors.push({ msg: 'Email is already registered' })
          res.send(errors);
        } else {
          const newUser = { firstName, lastName, email, address, picture }
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              newUser.passhash = hash;
              db.User.create(newUser);
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

exports.login = (req, res, next) => {
  passport.authenticate('local', (e, user, info) => {
    if (e) {
      return next(e)
    }
    if (info) {
      return res.send(info);
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      res.set({ "Access-Control-Allow-Origin": "http://localhost:3000" })
      res.status(200)
      res.send(user)
    });
  })(req, res, next);
};

exports.logout = (req, res) => {

  req.logout();
  req.session.destroy(function (err) {
    if (!err) {
      req.session = null
      res.status(200).clearCookie('connect.sid', { path: '/' }).send({ status: 'Successfully logged out' });
    } else {
      console.error(err)
      res.status(301).json({ status: 'Failed to log out' })
    }
  });
  console.log('req.isAuthenticated : ', req.isAuthenticated());
}