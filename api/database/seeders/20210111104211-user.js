'use strict';

const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [{
      username: 'admin@admin.com',
      password:  bcrypt.hashSync('password', 10),
      firstname: 'Admin',
      lastname: 'User',
      roleId: 1,
      visible: true,
      active: true,
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
