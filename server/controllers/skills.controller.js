const skills = require('../model');

module.exports = {
  getAll: async (ctx) => {
    ctx.body = await skills.getAll();
    return ctx.body
  },

  postSkill: async (ctx) => {
    try {
      ctx.body = await skills.addSkill(ctx.request.body);
      ctx.status = 200;
    } catch (error) {
      console.log(error);
      ctx.status = 500;
    }
  },

  deleteSkill: async (ctx) => {
    try {
      ctx.body = await skills.deleteSkill()
    } catch (error) {
      console.log(error);
      ctx.status = 500;
    }
  }
}