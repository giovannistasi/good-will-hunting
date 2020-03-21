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
    res.json(skills);
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};

exports.getSkillByUserId = async (req, res) => {
  try {
    const skills = await db.Skill.findAll({
      include: [
        {
          model: db.User,
          where: { userId: req.session.passport && req.session.passport.user.userId || null },
          attributes: ['firstName', 'lastName', 'picture', 'email']
        }
      ]
    });
    res.json(skills);
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
}

exports.post = async (req, res) => {
  const skill = req.body.skill;
  try {
    const user = await db.User.findOne({ where: { userId: req.session.passport && req.session.passport.user.userId || null } })
    const newSkill = await db.Skill.create({ skillName: skill });
    await user.addSkills(newSkill);
    res.json(newSkill)
    res.status = 200;
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};

exports.delete = async (req, res) => {
  const removedSkill = req.body.skill;
  try {
    const user = await db.User.findOne({ where: { userId: req.session.passport && req.session.passport.user.userId || null } })
    const newSkill = await db.Skill.findOne({ skillName: removedSkill });
    await user.addSkills(newSkill);
    res.json(newSkill)
    res.status = 200;
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
}
