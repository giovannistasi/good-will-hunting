'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
      type: DataTypes.UUID
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    credits: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    picture: {
      type: DataTypes.STRING
    },
    passhash: {
      allowNull: false,
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.TEXT
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    models.User.belongsToMany(models.Listing, { through: 'users_listings' });
    models.User.belongsToMany(models.Skill, { through: 'users_skills' });
    models.User.belongsToMany(models.Volunteer, { through: 'users_volunteers' });
  };
  return User;
};