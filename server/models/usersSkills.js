module.exports = (sequelize, DataTypes) => sequelize.define('users_skills', {
  user_id: {
    type: DataTypes.UUID,
    foreignKey: true
  },
  skill_id: {
    type: DataTypes.UUID,
    foreignKey: true,
  }
});
