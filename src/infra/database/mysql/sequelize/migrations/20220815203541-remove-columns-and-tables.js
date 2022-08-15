'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.dropTable('SoftSkills');
    await queryInterface.dropTable('HardSkills');
    await queryInterface.dropTable('SoftSkillsByJobVacancies');
    await queryInterface.dropTable('HardSkillsByJobVacancies');
    await queryInterface.dropTable('HardSkillsByJobVacancie');
    await queryInterface.dropTable('SoftSkillsByCandidate');
    await queryInterface.dropTable('HardSkillsByCandidate');
    await queryInterface.dropTable('BenefitsByJobVacancies');
    await queryInterface.dropTable('RequirementsByJobVacancies');
    await queryInterface.dropTable('JobBenefits');
    await queryInterface.dropTable('JobRequirements');

    await queryInterface.removeColumn('JobVacancies', 'gender');
    await queryInterface.removeColumn('JobVacancies', 'ethnicity');
    await queryInterface.removeColumn('JobVacancies', 'pcd');
    await queryInterface.removeColumn('JobVacancies', 'acceptsAllLevels');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.createTable('SoftSkills', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
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
    });
    await queryInterface.createTable('HardSkills', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
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
    });
    await queryInterface.createTable('HardSkillsByJobVacancie', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      jobVacanciesID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      hardSkillsID: {
        type: Sequelize.BIGINT,
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
    await queryInterface.createTable('SoftSkillsByJobVacancies', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      jobVacanciesID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      softSkillsID: {
        type: Sequelize.BIGINT,
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
    await queryInterface.createTable('SoftSkillsByCandidate', {
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
      softSkillsID: {
        type: Sequelize.BIGINT,
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
    await queryInterface.createTable('HardSkillsByCandidate', {
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
      hardSkillsID: {
        type: Sequelize.BIGINT,
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
    await queryInterface.createTable('JobBenefits', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
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
    });
    await queryInterface.createTable('BenefitsByJobVacancies', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      jobVacanciesID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      jobBenefitsID: {
        type: Sequelize.BIGINT,
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
    await queryInterface.createTable('RequirementsByJobVacancies', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      jobVacanciesID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      jobRequirementsID: {
        type: Sequelize.BIGINT,
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
    await queryInterface.createTable('JobRequirements', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
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
    });

    await queryInterface.addColumn('JobVacancies', 'gender', Sequelize.INTEGER);
    await queryInterface.addColumn(
      'JobVacancies',
      'ethnicity',
      Sequelize.INTEGER,
    );
    await queryInterface.addColumn('JobVacancies', 'pcd', Sequelize.INTEGER);
    await queryInterface.addColumn(
      'JobVacancies',
      'acceptsAllLevels',
      Sequelize.BOOLEAN,
    );
  },
};
