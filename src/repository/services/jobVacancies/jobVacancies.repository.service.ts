import { InjectModel } from '@nestjs/sequelize';
import { JobVacanciesModel } from 'src/common/models/jobVacancies.model';
import {
  JobRequirementsEntity,
  JobVacanciesByCompanyEntity,
  JobVacanciesEntity,
  RequirementsByJobVacanciesEntity,
} from 'src/entities';
import { BenefitsByJobVacanciesEntity } from 'src/entities/benefitsByJobVacancies.entity';
import { JobBenefitsEntity } from 'src/entities/jobBenefits.entity';
import { CreateJobVacanciesDTO } from 'src/modules/jobVacancies/dtos/create-jobVacancies.dto';

export class JobVacanciesRepositoryService {
  constructor(
    @InjectModel(JobVacanciesEntity)
    private readonly jobVacanciesEntity: typeof JobVacanciesEntity,
    @InjectModel(JobRequirementsEntity)
    private readonly jobRequirementsEntity: typeof JobRequirementsEntity,
    @InjectModel(JobBenefitsEntity)
    private readonly jobBenefitsEntity: typeof JobBenefitsEntity,
    @InjectModel(JobVacanciesByCompanyEntity)
    private readonly jobVacanciesByCompany: typeof JobVacanciesByCompanyEntity,
    @InjectModel(RequirementsByJobVacanciesEntity)
    private readonly requirementsByJobVacancies: typeof RequirementsByJobVacanciesEntity,
    @InjectModel(BenefitsByJobVacanciesEntity)
    private readonly benefitsByJobVacancies: typeof BenefitsByJobVacanciesEntity,
  ) {}

  async createJobVacancies({
    title,
    salary,
    contractType,
    cityAndState,
    level,
    gender,
    ethnicity,
    pcd,
    acceptAllLevels,
    requirements,
    benefits,
  }: CreateJobVacanciesDTO): Promise<JobVacanciesModel> {
    const transaction = await this.jobVacanciesEntity.sequelize.transaction();
    try {
        
    } catch (err) {
      await transaction.rollback();
      console.log(err.message);
    }
  }
}
