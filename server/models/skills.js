module.exports = (sequelize, DataTypes) => sequelize.define('Skills', {
  skill_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  skill_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});