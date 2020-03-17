module.exports = (sequelize, DataTypes) => sequelize.define('users', {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
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
});