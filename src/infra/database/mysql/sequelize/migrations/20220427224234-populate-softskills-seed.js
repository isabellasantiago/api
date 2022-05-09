'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SoftSkills', null, {});

    await queryInterface.bulkInsert('SoftSkills', [
      {
        name: 'BOA COMUNICAÇÃO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'LIDERANÇA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'FACILIDADE DE APRENDIZADO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'TRABALHO EM EQUIPE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'RESPONSABILIDADE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'RESOLUÇÃO DE PROBLEMAS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'COMUNICAÇÃO EFETIVA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'FLEXIBILIDADE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'PAIXÃO POR APRENDIZAGEM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'EMPATIA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'HONESTIDADE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'BOA GESTÃO DE TEMPO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'CAPACIDADE ANALÍTICA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'BOA DICCÇÃO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'BOA REDAÇÃO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SoftSkills', null, {});
  },
};
