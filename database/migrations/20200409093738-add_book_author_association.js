'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Books', //source model
      'AuthorId', // Name of the new column
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Authors',
          key: 'id'
        },
        
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.remove.Column(
      'Books',
      'AuthorId'
    )
  }
};
