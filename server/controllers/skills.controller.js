'use strict';

const db = require('../models');

exports.getAll = async (req, res) => {
  try {
    const skills = await db.Skill.findAll({
      include: [
        {
          model: db.User,
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
    const user = await db.User.findOne({ where: { userId: "79821dea-6910-11ea-bc55-0242ac130003" } })
    const newSkill = await db.Skill.create(skill);
    await user.addSkills(newSkill);
    res.json(newSkill)
    res.status = 200;
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};