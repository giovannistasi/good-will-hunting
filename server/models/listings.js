module.exports = (sequelize, DataTypes) => sequelize.define('listings', {
  listing_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  pending: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  // The timestamp is added automatically by Sequelize
  // http://docs.sequelizejs.com/manual/tutorial/models-definition.html#timestamps
  // posting_time: {
  //   type: DataTypes.DATETIME,
  // },
  event_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  credit_value: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  max_participants: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

});

