'use strict';

const db = require('../models');

exports.getAll = async ctx => {
  try {
    ctx.body = await db.Skills.findAll();
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};

exports.post = async ctx => {
  const skill = ctx.request.body;
  try {
    await db.Skills.create({
      skill_id: skill.skillId,
      first_name: skill.firstName
    });
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};
