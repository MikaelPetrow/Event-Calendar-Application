'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('event', [
      {
        title: 'Työ A',
        start: new Date(2021, 1, 1, 12, 0),
        end: new Date(2021, 1, 2, 12, 0),
        userId: 1,
        eventTypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Työ A',
        start: new Date(2021, 1, 4, 12, 0),
        end: new Date(2021, 1, 7, 12, 0),
        userId: 1,
        eventTypeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('event', null, {});
  }
};
