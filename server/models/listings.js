module.exports = (sequelize, DataTypes) => sequelize.define('Listings', {
  listing_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  pending: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  // The timestamp is added automatically by Sequelize
  // http://docs.sequelizejs.com/manual/tutorial/models-definition.html#timestamps
  // posting_time: {
  //   type: DataTypes.DATETIME,
  // },
  event_time: {
    type: DataTypes.DATETIME,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  credit_value: {
    type: DataTypes.INT,
    allowNull: false
  },
  max_participants: {
    type: DataTypes.INT,
    allowNull: false
  }

});

