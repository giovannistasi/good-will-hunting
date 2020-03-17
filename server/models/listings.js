module.exports = (sequelize, DataTypes) => sequelize.define('listings', {
  listingId: {
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
  eventTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  creditValue: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  maxParticipants: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

