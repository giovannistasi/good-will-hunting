'use strict';

const db = require('../models');

exports.getAll = async (req, res) => {
  try {
    const skills = await db.skills.findAll();
    res.json(skills)
  } catch (e) {
    res.status = 500;
  }
};

exports.post = async (req, res) => {
  const skill = req.body;
  try {
    await db.skills.create(skill);
    res.json(skill)
    res.status = 200;
  } catch (e) {
    res.status = 500;
  }
};
