/* eslint-disable @typescript-eslint/no-var-requires */
const seed = require('../seeders/20220407001659-populate-hardskills-table-seed');

module.exports = {
  async up(queryInterface, Sequelize) {
    // await seed.up(queryInterface, Sequelize);
  },

  async down(queryInterface, Sequelize) {
    // await seed.down(queryInterface, Sequelize, null);
  },
};
