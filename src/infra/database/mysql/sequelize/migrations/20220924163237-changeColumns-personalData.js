'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('PersonalDatas', 'birthDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('PersonalDatas', 'city', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('PersonalDatas', 'state', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('PersonalDatas', 'field', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('PersonalDatas', 'contractType', {
      type: Sequelize.ENUM('1 - PJ', '2-CLT', '3-PJ OU CLT', '4- OUTROS'),
      allowNull: true,
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
      allowNull: true,
    });
    await queryInterface.changeColumn('PersonalDatas', 'role', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('PersonalDatas', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('PersonalDatas', 'birthDate', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn('PersonalDatas', 'city', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('PersonalDatas', 'state', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('PersonalDatas', 'field', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('PersonalDatas', 'contractType', {
      type: Sequelize.ENUM('1 - PJ', '2-CLT', '3-PJ OU CLT', '4- OUTROS'),
      allowNull: false,
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
      allowNull: false,
    });
    await queryInterface.changeColumn('PersonalDatas', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('PersonalDatas', 'phone', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
