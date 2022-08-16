/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const seed = require('../seeders/20220607221221-changeColumn-type-user');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'type', {
      type: Sequelize.ENUM(['candidate', 'company']),
      allowNull: false,
    });

    await seed.up(queryInterface, Sequelize);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'type', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
