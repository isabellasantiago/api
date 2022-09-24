'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('PersonalDatas', 'gender');
    await queryInterface.removeColumn('PersonalDatas', 'ethnicity');
    await queryInterface.removeColumn('PersonalDatas', 'isPcd');
    await queryInterface.removeColumn('PersonalDatas', 'allowsWhatsapp');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn(
      'PersonalDatas',
      'gender',
      Sequelize.INTEGER,
    );
    await queryInterface.addColumn(
      'PersonalDatas',
      'ethnicity',
      Sequelize.INTEGER,
    );
    await queryInterface.addColumn('PersonalDatas', 'isPcd', Sequelize.INTEGER);
    await queryInterface.addColumn(
      'PersonalDatas',
      'allowsWhatsapp',
      Sequelize.BOOLEAN,
    );
  },
};
