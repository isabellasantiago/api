import { InjectModel } from '@nestjs/sequelize';
import { BenefitsByJobVacanciesModel } from 'src/common/models/benefitsByobVacancies.model';
import { JobVacanciesModel } from 'src/common/models/jobVacancies.model';
import { RequirementsByJobVacanciesModel } from 'src/common/models/requirementsByJobVacancies.model';
import {
  JobRequirementsEntity,
  JobVacanciesEntity,
  RequirementsByJobVacanciesEntity,
} from 'src/entities';
import { BenefitsByJobVacanciesEntity } from 'src/entities/benefitsByJobVacancies.entity';
import { HardSkillsByJobVacanciesEntity } from 'src/entities/hardSkillsByJobVacancies.entity';
import { JobBenefitsEntity } from 'src/entities/jobBenefits.entity';
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
    cityAndState,
    level,
    gender,
    ethnicity,
    pcd,
    acceptsAllLevels,
    requirements,
    benefits,
  }: CreateJobVacanciesDTO): Promise<JobVacanciesModel> {
    const transaction = await this.jobVacanciesEntity.sequelize.transaction();
    try {
      const jobVacancie = await this.jobVacanciesEntity.create({
        companyID,
        title,
        salary,
        contractType,
        cityAndState,
        level,
        gender,
        ethnicity,
        pcd,
        acceptsAllLevels,
      });

      await Promise.all(
        requirements.map(async (requirement) => {
          const requirementCreated = await this.jobRequirementsEntity.create(
            requirement,
          );
          await this.requirementsByJobVacanciesEntity.create({
            jobVacanciesID: jobVacancie.id,
            jobRequirementsID: requirementCreated.id,
          });
        }),
      );

      await Promise.all(
        benefits.map(async (benefit) => {
          const benefitsCreated = await this.jobBenefitsEntity.create(benefit);
          await this.benefitsByJobVacanciesEntity.create({
            jobVacanciesID: jobVacancie.id,
            jobBenefitsID: benefitsCreated.id,
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
}
