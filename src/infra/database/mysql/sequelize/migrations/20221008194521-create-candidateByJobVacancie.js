'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('CandidatesByJobVacancie', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      jobVacancieID: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'JobVacancies',
          key: 'id'
        }
      },
      candidateID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      isApplied: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      matchPercentage: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
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

    queryInterface.addConstraint('CandidatesByJobVacancie', {
      fields: ['candidateID'],
      type: 'foreign key',
      name: 'candidate_association',
      references: {
        table: 'Candidates',
        field: 'id'
      }
    });

    queryInterface.addConstraint('CandidatesByJobVacancie', {
      fields: ['jobVacancieID'],
      type: 'foreign key',
      name: 'jobVacancies_association',
      references: {
        table: 'JobVacancies',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('CandidatesByJobVacancie')

    queryInterface.removeConstraint('CandidatesByJobVacancie', {
      fields: ['candidateID'],
      type: 'foreign key',
      name: 'candidate_association',
      references: {
        table: 'Candidates',
        field: 'id'
      }
    });

    queryInterface.removeConstraint('CandidatesByJobVacancie', {
      fields: ['jobVacancieID'],
      type: 'foreign key',
      name: 'jobVacancies_association',
      references: {
        table: 'JobVacancies',
        field: 'id'
      }
    })
  }
};
