'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('AcademicInformations', {
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
        instituitionName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        courseName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        academicFormation: {
          type: Sequelize.ENUM('0- Ensino médio/regular', '1- Técnologo','2- Ensino Superior', '3- Pós graduação', '4- Mestrado', '5- Doutorado'),
          allowNull: false,
        },
        academicFormationStatus: {
          type: Sequelize.ENUM('0- Cursando', '2- Concluido', '3 - Trancado'),
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
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('AcademicInformations');
  }
};
