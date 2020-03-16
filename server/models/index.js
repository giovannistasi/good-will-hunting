'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize('good_will_hunting', 'rich', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    useUTC: true,
    dateStrings: true,
  },
  // timezone: '+01:00',
  // operatorsAliases: false
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users.belongsToMany(db.listings, { through: db.users_listings })
db.listings.belongsTo(db.users, { through: db.users_listings });
db.users.belongsToMany(db.skills, { through: db.users_skills })
db.skills.belongsTo(db.users, { through: db.users_skills });

module.exports = db;
