'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('Companies', 'mission', {
      type: Sequelize.STRING,
      after: 'type',
    });

    await queryInterface.addColumn('Companies', 'values', {
      type: Sequelize.STRING,
      after: 'type',
    });

    await queryInterface.addColumn('Companies', 'vision', {
      type: Sequelize.STRING,
      after: 'type',
    });

    await queryInterface.addColumn('Companies', 'cover', {
      type: Sequelize.STRING,
      after: 'type',
    });

    await queryInterface.addColumn('Companies', 'photo', {
      type: Sequelize.STRING,
      after: 'type',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('Companies', 'mission');
    await queryInterface.removeColumn('Companies', 'values');
    await queryInterface.removeColumn('Companies', 'vision');
    await queryInterface.removeColumn('Companies', 'cover');
    await queryInterface.removeColumn('Companies', 'photo');
  },
};
