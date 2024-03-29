'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'AcademicInformations',
      'graduationStartDate',
      {
        type: Sequelize.DATE,
        allowNull: false,
      },
    );

    await queryInterface.addColumn(
      'AcademicInformations',
      'graduationEndDate',
      {
        type: Sequelize.DATE,
        allowNull: true,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(
      'AcademicInformations',
      'graduationStartDate',
    );
    await queryInterface.removeColumn(
      'AcademicInformations',
      'graduationEndDate',
    );
  },
};
