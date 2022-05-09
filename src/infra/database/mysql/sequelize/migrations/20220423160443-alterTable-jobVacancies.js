'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn('JobVacancies', 'gender', {
      type: Sequelize.ENUM([
        '1- Mulher',
        '2 -Trans',
        '3- Mulher (cis) e Pessoas Trans',
        '4 - Outros',
      ]),
      allowNull: false,
    });

    await queryInterface.changeColumn('JobVacancies', 'level', {
      type: Sequelize.ENUM([
        '1-Estágio',
        '3-PL',
        '4-SR',
        '5-Analista',
        '6-Agente',
      ]),
    });

    await queryInterface.changeColumn('JobVacancies', 'contractType', {
      type: Sequelize.ENUM(['1 - PJ', '2-CLT', '3-PJ OU CLT', '4- OUTROS']),
    });

    await queryInterface.changeColumn('JobVacancies', 'ethnicity', {
      type: Sequelize.ENUM(['1-Negra', '2 - Indígena', '3- Amarela']),
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.changeColumn('JobVacancies', 'gender', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });

    await queryInterface.changeColumn('JobVacancies', 'level', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('JobVacancies', 'contractType', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('JobVacancies', 'ethnicity', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
