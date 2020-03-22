'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Listings', {
      listingId: {
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1,
        type: Sequelize.UUID
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      completed: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      pending: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      eventTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      creditValue: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      maxParticipants: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Listings');
  }
};