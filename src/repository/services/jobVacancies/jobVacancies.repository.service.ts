import { InjectModel } from '@nestjs/sequelize';
import { JobVacanciesModel } from 'src/common/models/jobVacancies.model';
import { CompanyEntity, JobVacanciesEntity } from 'src/entities';
import { CreateJobVacanciesDTO } from 'src/modules/jobVacancies/dtos/create-jobVacancies.dto';

export class JobVacanciesRepositoryService {
  constructor(
    @InjectModel(JobVacanciesEntity)
    private readonly jobVacanciesEntity: typeof JobVacanciesEntity,
    @InjectModel(CompanyEntity)
    private readonly companyEntity: typeof CompanyEntity,
  ) {}

  async createJobVacancies({
    companyID,
    title,
    salary,
    contractType,
    about,
    cityAndState,
    level,
  }: CreateJobVacanciesDTO): Promise<JobVacanciesModel> {
    const transaction = await this.jobVacanciesEntity.sequelize.transaction();
    try {
      const company = await this.companyEntity.findByPk(companyID);

      if (company) {
        const jobVacancie = await this.jobVacanciesEntity.create({
          companyID,
          title,
          salary,
          contractType,
          about,
          cityAndState,
          level,
        });

        transaction.commit();
        return jobVacancie;
      }
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

  async getJobVacancieByCompanyID(
    companyID: number,
    id: number,
  ): Promise<JobVacanciesModel> {
    const jobVacancie = await this.jobVacanciesEntity.findOne({
      where: { companyID, id },
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

  async updateJobVacancie({
    companyID,
    title,
    salary,
    contractType,
    about,
    cityAndState,
    level,
  }: CreateJobVacanciesDTO): Promise<JobVacanciesModel> {
    const transaction = await this.companyEntity.sequelize.transaction();
    try {
      const company = this.companyEntity.findByPk(companyID);

      if (company) {
        const jobVacancie = await this.jobVacanciesEntity.findOne({
          where: { companyID },
        });

        if (jobVacancie) {
          await jobVacancie.update({
            companyID,
            title,
            salary,
            contractType,
            about,
            cityAndState,
            level,
          });
          transaction.commit();
          return jobVacancie;
        }
      }
    } catch (err) {
      await transaction.rollback();
      console.log(err.message);
    }
  }
}
