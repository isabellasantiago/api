'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LanguagesInformations', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      candidateID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      languageName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      languageLevel: {
        type: Sequelize.ENUM(
          '1- Básico',
          '2 Intermediário',
          '3- Avançado',
          '4- Fluente',
        ),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LanguagesInformations');
  },
};
