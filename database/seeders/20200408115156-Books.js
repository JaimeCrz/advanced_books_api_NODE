'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Books',
      [
        {
          title: 'Learning node',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Learning Angular for dummies',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {})
  }
};
