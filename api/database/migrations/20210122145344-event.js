'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return (
      queryInterface.removeColumn(
        'event',
        'fileUrl',
      ),
      queryInterface.removeColumn(
        'event',
        'fileFd',
      )
    )
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('event');
  }
};
