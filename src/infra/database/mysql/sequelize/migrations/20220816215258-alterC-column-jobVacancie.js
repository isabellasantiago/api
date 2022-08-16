'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn('JobVacancies', 'level', {
      type: Sequelize.ENUM([
        '1-Estágio',
        '2-JR',
        '3-PL',
        '4-SR',
        '5-Analista',
        '6-Agente',
      ]),
    });

    await queryInterface.changeColumn('PersonalDatas', 'level', {
      type: Sequelize.ENUM([
        '1-Estágio',
        '2-JR',
        '3-PL',
        '4-SR',
        '5-Analista',
        '6-Agente',
      ]),
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('JobVacancies', 'level', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('PersonalDatas', 'level', {
      type: Sequelize.ENUM([
        '0-Estágio',
        '1-JR',
        '2-PL',
        '3-SR',
        '4-Analista',
        '5- Agente',
      ]),
      allowNull: false,
    });
  },
};
