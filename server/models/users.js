module.exports = (sequelize, DataTypes) => sequelize.define('Users', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  credits: {
    type: DataTypes.STRING,
    defaultValue: 0
  },
  picture: {
    type: DataTypes.STRING,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passhash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
  // The timestamp is added automatically by Sequelize
  // http://docs.sequelizejs.com/manual/tutorial/models-definition.html#timestamps
});