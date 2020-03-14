'use strict';

const db = require('../models');

exports.getAll = async ctx => {
  try {
    ctx.body = await db.Users.findAll();
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};

exports.post = async ctx => {
  const user = ctx.request.body;
  try {
    await db.Users.create({
      user_id: user.userId,
      first_name: user.firstName,
      last_name: user.lastName,
      credits: user.credits,
      picture: user.picture,
      salt: user.salt,
      passhash: user.passhash,
      address: user.address,
      email: user.email,
    });
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};
