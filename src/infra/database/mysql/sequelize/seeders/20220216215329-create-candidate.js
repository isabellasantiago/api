'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Candidate', [
      {
        userID: 1,
        name: 'Isabella',
        lastName: 'Santiago',
        cpf: '34596090874',
        phone: '+5511936184112',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Candidate', null, {});
  },
};
