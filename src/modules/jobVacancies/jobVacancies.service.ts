import { BadRequestException, Inject } from '@nestjs/common';
import { JobVacanciesModel } from 'src/common/models/jobVacancies.model';
import { JobVacanciesRepositoryService } from 'src/repository/services/jobVacancies/jobVacancies.repository.service';
import { CreateJobVacanciesDTO } from './dtos/create-jobVacancies.dto';

export class JobVacanciesService {
  constructor(
    @Inject(JobVacanciesRepositoryService)
    private readonly jobVacanciesRepository: JobVacanciesRepositoryService,
  ) {}

  async createJobVacancies(
    data: CreateJobVacanciesDTO,
  ): Promise<JobVacanciesModel> {
    if (!data) throw new BadRequestException('Invalid params');

    const {
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
      softSkills,
      hardSkills,
    } = data;

    const jobVacancie = await this.jobVacanciesRepository.createJobVacancies({
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
      softSkills,
      hardSkills,
    });

    return jobVacancie;
  }
}
