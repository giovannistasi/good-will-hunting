module.exports = (sequelize, DataTypes) => sequelize.define('skills', {
  skillId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  skillName: {
    type: DataTypes.STRING,
    allowNull: false
  }
});