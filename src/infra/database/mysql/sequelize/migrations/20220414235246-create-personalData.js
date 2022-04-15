'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PersonalDatas', {
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
      imageURL: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      linkedinURL: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      naturalness: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('0 - Mulher', '1- Mulher Trans', '2 - Pessoas Trans', '3- Mulher (cis) e Pessoas Trans'),
        allowNull: false,
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ethnicity: {
        type: Sequelize.ENUM('0- Negra', '1- Indígena', '2-Amarela', '3-Branca'),
        allowNull: false,
      },
      isPcd: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      allowsWhatsapp:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      field:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      contractType: {
        type: Sequelize.ENUM('0 - PJ', '1-CLT', '2-PJ OU CLT', '3- OUTROS'),
        allowNull: false,
      },
      level: {
        type: Sequelize.ENUM('0-Estágio', '1-JR', '2-PL', '3-SR', '4-Analista', '5- Agente'),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('PreviousJobs');
  }
};
