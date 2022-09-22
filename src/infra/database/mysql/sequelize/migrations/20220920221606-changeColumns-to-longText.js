'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('Companies', 'imageURL', {
      type: Sequelize.TEXT('long'),
    });
    await queryInterface.changeColumn('Companies', 'photo', {
      type: Sequelize.TEXT('long'),
    });
    await queryInterface.changeColumn('Companies', 'aboutCompany', {
      type: Sequelize.TEXT('long'),
    });
    await queryInterface.changeColumn('Companies', 'cover', {
      type: Sequelize.TEXT('long'),
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.changeColumn('Companies', 'imageURL', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('Companies', 'photo', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('Companies', 'aboutCompany', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('Companies', 'cover', {
      type: Sequelize.STRING,
    });
  },
};
