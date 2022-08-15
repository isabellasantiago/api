import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { JobVacanciesModel } from 'src/common/models/jobVacancies.model';
import { CompanyRepositoryService } from 'src/repository/services/company/company.repository.service';
import { JobVacanciesRepositoryService } from 'src/repository/services/jobVacancies/jobVacancies.repository.service';
import { CreateJobVacanciesDTO } from '../dtos/create-jobVacancies.dto';

export class JobVacanciesService {
  constructor(
    @Inject(JobVacanciesRepositoryService)
    private readonly jobVacanciesRepository: JobVacanciesRepositoryService,
    @Inject(CompanyRepositoryService)
    private readonly companyRepository: CompanyRepositoryService,
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
      about,
      cityAndState,
      level,
    } = data;

    const companyExists = await this.companyRepository.getCompanyByID(
      companyID,
    );

    if (!companyExists) throw new NotFoundException('Company Not Found');

    const jobVacancie = await this.jobVacanciesRepository.createJobVacancies({
      companyID,
      title,
      salary,
      contractType,
      about,
      cityAndState,
      level,
    });

    return jobVacancie;
  }

  async getAllJobVacancies(): Promise<JobVacanciesModel[]> {
    return await this.jobVacanciesRepository.getAllJobVacancies();
  }

  async getJobVacancie(id: number): Promise<JobVacanciesModel> {
    const jobVacancie = await this.jobVacanciesRepository.getJobVacancie(id);

    if (!jobVacancie) throw new NotFoundException('Job Vacancie Not Found');

    return jobVacancie;
  }

  async getAllCompanyJobVacancies(
    companyID: number,
  ): Promise<JobVacanciesModel[]> {
    const companyExists = await this.companyRepository.getCompanyByID(
      companyID,
    );
    if (!companyExists) throw new NotFoundException('Company Not Found');

    const jobVacancies =
      await this.jobVacanciesRepository.getAllCompanyJobVacancies(companyID);

    return jobVacancies;
  }

  async pauseJobVacancie(id: number): Promise<JobVacanciesModel> {
    const jobVacancieExists = await this.jobVacanciesRepository.getJobVacancie(
      id,
    );
    if (!jobVacancieExists)
      throw new NotFoundException('Job Vacancie Not Found');

    const jobVacancieUpdated =
      await this.jobVacanciesRepository.pauseJobVacancie(id);

    return jobVacancieUpdated;
  }

  async deleteJobVacancie(id: number): Promise<boolean> {
    const jobVacancieExists = await this.jobVacanciesRepository.getJobVacancie(
      id,
    );
    if (!jobVacancieExists)
      throw new NotFoundException('Job Vacancie Not Found');

    const deleted = await this.jobVacanciesRepository.deleteJobVacancies(id);

    return deleted;
  }

  async updateJobVacancie(
    jobVacancieID: number,
    data: CreateJobVacanciesDTO,
  ): Promise<JobVacanciesModel> {
    const jobVacancie =
      await this.jobVacanciesRepository.getJobVacancieByCompanyID(
        data.companyID,
        jobVacancieID,
      );

    if (!jobVacancie) throw new NotFoundException('Job Vacancie Not Found');

    if (!data) throw new BadRequestException('Invalid Params');

    const company = await this.companyRepository.getCompanyByID(data.companyID);

    if (!company) throw new NotFoundException('Company Not Found');

    return await this.jobVacanciesRepository.updateJobVacancie({ ...data });
  }
}
