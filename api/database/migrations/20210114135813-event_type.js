'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('event_type', {
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
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('event_type');
  }
};
