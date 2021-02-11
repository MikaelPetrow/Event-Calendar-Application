'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('event_type', [
      {
        id: 1,
        title: 'Valmistelu',
        color: '#FF0000',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        id: 2,
        title: 'Rakennus',
        color: '#00FF00',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        id: 3,
        title: 'Purku',
        color: '#0000FF',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        id: 4,
        title: 'Loma',
        color: '#FFFF00',
        createdAt : new Date(),
        updatedAt : new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('event_type', null, {});
  }
};
