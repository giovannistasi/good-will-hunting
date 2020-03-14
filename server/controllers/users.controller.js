'use strict';

const db = require('../models');

exports.getAll = async (req, res) => {
  try {
    const users = await db.users.findAll();
    res.json(users);
  } catch (e) {
    res.status = 500;
  }
};

exports.post = async (req, res) => {
  const user = req.body;
  try {
    await db.users.create(user);
    res.json(user);
    res.status = 200;
  } catch (e) {
    res.status = 500;
  }
};
