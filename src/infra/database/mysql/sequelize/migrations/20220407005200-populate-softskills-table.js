'use strict';
const seed = require('../seeders/20220407001659-populate-hardskills-table-seed')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     
     await seed.up(queryInterface, Sequelize)
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await seed.down(queryInterface, Sequelize, null)
  }
};
