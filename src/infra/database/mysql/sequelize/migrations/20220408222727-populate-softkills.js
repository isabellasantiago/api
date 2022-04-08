'use strict';

const seed = require('../seeders/20220331230005-create-soft-skills')

module.exports = {
  async up (queryInterface, Sequelize) {
    await seed.up(queryInterface, Sequelize)
  },

  async down (queryInterface, Sequelize) {
    await seed.down(queryInterface, Sequelize, null)
  }
};
