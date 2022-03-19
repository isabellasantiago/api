import { InjectModel } from '@nestjs/sequelize';
import { BenefitsByJobVacanciesModel } from 'src/common/models/benefitsByobVacancies.model';
import { HardSkillsByJobVacanciesModel } from 'src/common/models/hardSkillsByJobVacancies.model';
import { JobVacanciesModel } from 'src/common/models/jobVacancies.model';
import { RequirementsByJobVacanciesModel } from 'src/common/models/requirementsByJobVacancies.model';
import { SoftSkillsByJobVacanciesModel } from 'src/common/models/softSkillsByJobVacancies.model';
import {
  CompanyEntity,
  JobRequirementsEntity,
  JobVacanciesEntity,
  RequirementsByJobVacanciesEntity,
} from 'src/entities';
import { BenefitsByJobVacanciesEntity } from 'src/entities/benefitsByJobVacancies.entity';
import { HardSkillsEntity } from 'src/entities/hardSkills.entity';
import { HardSkillsByJobVacanciesEntity } from 'src/entities/hardSkillsByJobVacancies.entity';
import { JobBenefitsEntity } from 'src/entities/jobBenefits.entity';
import { SoftSkillsEntity } from 'src/entities/softSkills.entity';
import { SoftSkillsByJobVacanciesEntity } from 'src/entities/softSkillsByJobVacancies.entity';
import { CreateJobVacanciesDTO } from 'src/modules/jobVacancies/dtos/create-jobVacancies.dto';

export class JobVacanciesRepositoryService {
  constructor(
    @InjectModel(JobVacanciesEntity)
    private readonly jobVacanciesEntity: typeof JobVacanciesEntity,
    @InjectModel(JobRequirementsEntity)
    private readonly jobRequirementsEntity: typeof JobRequirementsEntity,
    @InjectModel(JobBenefitsEntity)
    private readonly jobBenefitsEntity: typeof JobBenefitsEntity,
    @InjectModel(RequirementsByJobVacanciesEntity)
    private readonly requirementsByJobVacanciesEntity: typeof RequirementsByJobVacanciesEntity,
    @InjectModel(BenefitsByJobVacanciesEntity)
    private readonly benefitsByJobVacanciesEntity: typeof BenefitsByJobVacanciesEntity,
    @InjectModel(SoftSkillsEntity)
    private readonly softSkillsEntity: typeof SoftSkillsEntity,
    @InjectModel(HardSkillsEntity)
    private readonly hardSkillsEntity: typeof HardSkillsEntity,
    @InjectModel(SoftSkillsByJobVacanciesEntity)
    private readonly softSkillsByJobVacancies: typeof SoftSkillsByJobVacanciesEntity,
    @InjectModel(HardSkillsByJobVacanciesEntity)
    private readonly hardSkillsByJobVacancies: typeof HardSkillsByJobVacanciesEntity,
  ) {}

  async createJobVacancies({
    companyID,
    title,
    salary,
    contractType,
    about,
    cityAndState,
    level,
    gender,
    ethnicity,
    pcd,
    acceptsAllLevels,
    requirements,
    benefits,
    softSkills,
    hardSkills,
  }: CreateJobVacanciesDTO): Promise<JobVacanciesModel> {
    const transaction = await this.jobVacanciesEntity.sequelize.transaction();
    try {
      const jobVacancie = await this.jobVacanciesEntity.create({
        companyID,
        title,
        salary,
        contractType,
        about,
        cityAndState,
        level,
        gender,
        ethnicity,
        pcd,
        acceptsAllLevels,
      });

      await Promise.all(
        requirements.map(async (requirement) => {
          const requirementConverted = requirement.name.toUpperCase();
          const requirementAlreadyExists =
            await this.jobRequirementsEntity.findOne({
              where: { name: requirement.name },
            });

          if (
            requirementAlreadyExists &&
            requirementAlreadyExists.name === requirementConverted
          ) {
            await this.requirementsByJobVacanciesEntity.create({
              jobVacanciesID: jobVacancie.id,
              jobRequirementsID: requirementAlreadyExists.id,
            });
          }
          const requirementCreated = await this.jobRequirementsEntity.create({
            name: requirementConverted,
          });
          await this.requirementsByJobVacanciesEntity.create({
            jobVacanciesID: jobVacancie.id,
            jobRequirementsID: requirementCreated.id,
          });
        }),
      );

      await Promise.all(
        benefits.map(async (benefit) => {
          const benefitConverted = benefit.name.toUpperCase();
          const benefitAlreadyExists = await this.jobBenefitsEntity.findOne({
            where: { name: benefitConverted },
          });

          if (
            benefitAlreadyExists &&
            benefitAlreadyExists.name === benefitConverted
          ) {
            await this.benefitsByJobVacanciesEntity.create({
              jobVacanciesID: jobVacancie.id,
              jobBenefitsID: benefitAlreadyExists.id,
            });
          }

          const benefitsCreated = await this.jobBenefitsEntity.create({
            name: benefitConverted,
          });
          await this.benefitsByJobVacanciesEntity.create({
            jobVacanciesID: jobVacancie.id,
            jobBenefitsID: benefitsCreated.id,
          });
        }),
      );

      await Promise.all(
        softSkills.map(async (softSkill) => {
          const convertedSoftSkill = softSkill.name.toUpperCase();
          const softSkillExists = await this.softSkillsEntity.findOne({
            where: { name: softSkill.name },
          });

          if (softSkillExists && softSkillExists.name === convertedSoftSkill) {
            await this.softSkillsByJobVacancies.create({
              jobVacanciesID: jobVacancie.id,
              softSkillsID: softSkillExists.id,
            });
          }
          const softSkillCreated = await this.softSkillsEntity.create({
            ...softSkill,
            name: convertedSoftSkill,
          });
          await this.softSkillsByJobVacancies.create({
            jobVacanciesID: jobVacancie.id,
            softSkillsID: softSkillCreated.id,
          });
        }),
      );

      await Promise.all(
        hardSkills.map(async (hardSkill) => {
          const convertedSoftSkill = hardSkill.name.toUpperCase();
          const softSkillExists = await this.hardSkillsEntity.findOne({
            where: { name: hardSkill.name },
          });

          if (softSkillExists && softSkillExists.name === convertedSoftSkill) {
            await this.hardSkillsByJobVacancies.create({
              jobVacanciesID: jobVacancie.id,
              hardSkillsID: softSkillExists.id,
            });
          }
          const hardSkillCreated = await this.hardSkillsEntity.create({
            ...hardSkill,
            name: convertedSoftSkill,
          });
          await this.hardSkillsByJobVacancies.create({
            jobVacanciesID: jobVacancie.id,
            hardSkillsID: hardSkillCreated.id,
          });
        }),
      );

      transaction.commit();
      return jobVacancie;
    } catch (err) {
      await transaction.rollback();
      console.log(err.message);
    }
  }

  async getAllJobVacancies(): Promise<JobVacanciesModel[]> {
    return await this.jobVacanciesEntity.findAll();
  }

  async getJobVacancie(id: number): Promise<JobVacanciesModel> {
    const jobVacancie = await this.jobVacanciesEntity.findOne({
      where: { id },
      include: [
        {
          model: CompanyEntity,
          required: true,
        },
      ],
    });

    return jobVacancie;
  }

  async getAllCompanyJobVacancies(
    companyID: number,
  ): Promise<JobVacanciesModel[]> {
    return await this.jobVacanciesEntity.findAll({ where: { companyID } });
  }

  async deleteJobVacancies(id: number): Promise<boolean> {
    const jobVacancie = await this.jobVacanciesEntity.findByPk(id);

    if (jobVacancie) {
      await jobVacancie.destroy();
      return true;
    }

    return false;
  }

  async pauseJobVacancie(id: number): Promise<JobVacanciesModel> {
    const jobVacancie = await this.jobVacanciesEntity.findByPk(id);

    const updated = await jobVacancie.update({ paused: true });

    return updated;
  }

  async getJobVacancieRequirements(
    jobVacanciesID: number,
  ): Promise<RequirementsByJobVacanciesModel[]> {
    const requirements = await this.requirementsByJobVacanciesEntity.findAll({
      where: { jobVacanciesID },
      include: [
        {
          model: JobRequirementsEntity,
          required: true,
        },
      ],
    });

    return requirements;
  }

  async getJobVacancieBenefits(
    jobVacanciesID: number,
  ): Promise<BenefitsByJobVacanciesModel[]> {
    const benefits = await this.benefitsByJobVacanciesEntity.findAll({
      where: { jobVacanciesID },
      include: { model: JobBenefitsEntity, required: true },
    });

    return benefits;
  }

  async getJobVacancieSoftSkills(
    jobVacanciesID: number,
  ): Promise<SoftSkillsByJobVacanciesModel[]> {
    const softSkills = await this.softSkillsByJobVacancies.findAll({
      where: { jobVacanciesID },
      include: { model: SoftSkillsEntity, required: true },
    });
    return softSkills;
  }

  async getJobVacancieHardSkills(
    jobVacanciesID: number,
  ): Promise<HardSkillsByJobVacanciesModel[]> {
    const hardSkills = await this.hardSkillsByJobVacancies.findAll({
      where: { jobVacanciesID },
      include: { model: HardSkillsEntity, required: true },
    });
    return hardSkills;
  }
}
