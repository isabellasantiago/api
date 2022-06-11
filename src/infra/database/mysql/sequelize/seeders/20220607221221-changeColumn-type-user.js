'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkUpdate('Users', {
      type: 'candidate'
    }, { id: 1 })

    await queryInterface.bulkUpdate('Users', {
      type: 'company'
    }, { id: 2 })
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkUpdate('Users', {
      type: 1
    }, { id: 1 })

    await queryInterface.bulkUpdate('Users', {
      type: 2
    }, { id: 2 })
  }
};
