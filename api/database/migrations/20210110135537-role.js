'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('role', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('role');
  }
};
