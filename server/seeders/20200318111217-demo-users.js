'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    
      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {
        userId: "79821dea-6910-11ea-bc55-0242ac130003",
        firstName: "Richard",
        lastName: "Perkins",
        picture: "picture.svg",
        passhash: "passhash",
        address: "address",
        email: "RP@google.com",
        createdAt: "2020-03-18 00:56:26.125+01",
        updatedAt: "2020-03-18 00:56:26.125+01"
      },
      {
        userId: "857596c2-6910-11ea-bc55-0242ac130003",
        firstName: "Giovanni",
        lastName: "Stasi",
        picture: "picture.svg",
        passhash: "passhash",
        address: "address",
        email: "GS@google.com",
        createdAt: "2020-03-18 00:56:26.125+01",
        updatedAt: "2020-03-18 00:56:26.125+01"
      },
      {
        userId: "8d164f8e-6910-11ea-bc55-0242ac130003",
        firstName: "Joe",
        lastName: "Burin",
        picture: "picture.svg",
        passhash: "passhash",
        address: "address",
        email: "JB@google.com",
        createdAt: "2020-03-18 00:56:26.125+01",
        updatedAt: "2020-03-18 00:56:26.125+01"
      },
      {
        userId: "9d59e4e6-6910-11ea-bc55-0242ac130003",
        firstName: "Ila",
        lastName: "Krishnamoorthy",
        credits: 0,
        picture: "picture.svg",
        passhash: "passhash",
        address: "address",
        email: "IK@google.com",
        createdAt: "2020-03-18 00:56:26.125+01",
        updatedAt: "2020-03-18 00:56:26.125+01"
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
