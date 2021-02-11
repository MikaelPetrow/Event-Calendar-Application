'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return (
      queryInterface.changeColumn('file', 'name', {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      })
    )
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('event');
  }
};

