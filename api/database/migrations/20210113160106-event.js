'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('event', {
      id: {
        allowNull: false,
        autoIncrement: true,
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
        type: Sequelize.STRING,
      },
      start: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      end: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      eventTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      fileUrl: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      fileFd: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('event');
  }
};
