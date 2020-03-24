'use strict';
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    listingId: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
      type: DataTypes.UUID
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    completed: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    pending: {
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    eventTime: {
      allowNull: false,
      type: DataTypes.DATE
    },
    address: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    creditValue: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    maxParticipants: {
      allowNull: false,
      type: DataTypes.INTEGER
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
  Listing.associate = function (models) {
    // associations can be defined here
    models.Listing.belongsToMany(models.User, { through: 'users_listings' });
    models.Listing.belongsToMany(models.User, { as: 'Volunteers', through: 'listings_volunteers' });
  };
  return Listing;
};