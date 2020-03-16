'use strict';

const db = require('../models');

exports.getAll = async (req, res) => {
  console.log(1);
  try {
    const users = await db.users.findAll({
      // include: [
      //   {
      //     model: db.skills,
      //   },
      //   {
      //     model: db.listings,
      //   }
      // ]
    })

    console.log(2);
    res.json(users);
  } catch (e) {
    console.error(e);
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
