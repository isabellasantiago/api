'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('HardSkills', [
      {
        name: 'HTML',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'JS',
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        name: 'CSS',
        createdAt: new Date(),
        updatedAt: new Date()

      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('HardSkills', null, {});
  }
};
