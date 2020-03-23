'use strict';
module.exports = (sequelize, DataTypes) => {
  const Volunteer = sequelize.define('Volunteer', {
    volunteerId: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
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
  Volunteer.associate = function (models) {
    // associations can be defined here
    models.Volunteer.belongsToMany(models.Listing, { through: 'listings_volunteers' });
  };
  return Volunteer;
};