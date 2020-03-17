'use strict';

const db = require('../models');

exports.getAll = async (req, res) => {
  try {
    const skills = await db.skills.findAll({
      include: [
        {
          model: db.users,
          attributes: ['firstName', 'lastName', 'picture', 'email']
        }
      ]
    });
    res.json(skills)
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};

exports.post = async (req, res) => {
  const skill = req.body;
  try {
    const user = await db.users.findOne({ where: { userId: req.session.id } })
    const newSkill = await db.skills.create(skill);
    await user.addSkills(newSkill);
    res.json(newSkill)
    res.status = 200;
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};
