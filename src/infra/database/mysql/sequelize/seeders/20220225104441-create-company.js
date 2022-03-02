'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Companies', [
      {
        userID: 2,
        cnpj: '76931300000156',
        tradeName: 'Consultoria LTDA',
        corporateName: 'Redfox Digital Solutions',
        address: 'São Paulo, Brasil',
        imageURL:
          'https://media-exp1.licdn.com/dms/image/C4D0BAQFc01y5Sfo78Q/company-logo_200_200/0/1625511906142?e=1654128000&v=beta&t=Xs4QyaKZaVMhW9E3syOcCxZZYvjDAJ-2LdWMdXrTynU',
        linkedinURL:
          'https://www.linkedin.com/company/redfoxdigitalsolutions/mycompany/',
        aboutCompany: 'Somos uma empresa de inovação!',
        type: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    https: await queryInterface.bulkDelete('Companies', null, {});
  },
};
