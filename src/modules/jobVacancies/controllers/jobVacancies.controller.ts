import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BenefitsByJobVacanciesModel } from 'src/common/models/benefitsByobVacancies.model';
import { HardSkillsByJobVacanciesModel } from 'src/common/models/hardSkillsByJobVacancies.model';
import { JobVacanciesModel } from 'src/common/models/jobVacancies.model';
import { RequirementsByJobVacanciesModel } from 'src/common/models/requirementsByJobVacancies.model';
import { SoftSkillsByJobVacanciesModel } from 'src/common/models/softSkillsByJobVacancies.model';
import { CreateJobVacanciesDTO } from '../dtos/create-jobVacancies.dto';
import { JobVacanciesService } from '../services/jobVacancies.service';

@ApiTags('Job Vacancie')
@Controller('jobVacancie')
export class JobVacancieController {
  constructor(
    @Inject(JobVacanciesService)
    private readonly jobVacanciesService: JobVacanciesService,
  ) {}

  @Post('/')
  async create(
    @Body(new ValidationPipe({ transform: true })) data: CreateJobVacanciesDTO,
  ): Promise<JobVacanciesModel> {
    return await this.jobVacanciesService.createJobVacancies(data);
  }

  @Get('/:id')
  async getJobVacancieByID(
    @Param(new ValidationPipe({ transform: true })) param: { id: number },
  ): Promise<JobVacanciesModel> {
    return await this.jobVacanciesService.getJobVacancie(param.id);
  }

  @Get('/')
  async getAllJobVacancies(): Promise<JobVacanciesModel[]> {
    return await this.jobVacanciesService.getAllJobVacancies();
  }

  @Get('/company/:companyID')
  async getAllCompanyJobVacancies(
    @Param(new ValidationPipe({ transform: true }))
    param: {
      companyID: number;
    },
  ): Promise<JobVacanciesModel[]> {
    return await this.jobVacanciesService.getAllCompanyJobVacancies(
      param.companyID,
    );
  }

  @Get('/requirements/:id')
  async getRequirements(
    @Param(new ValidationPipe({ transform: true })) param: { id: number },
  ): Promise<RequirementsByJobVacanciesModel[]> {
    return await this.jobVacanciesService.getJobVacanciesRequirements(param.id);
  }

  @Get('/benefits/:id')
  async getBenefits(
    @Param(new ValidationPipe({ transform: true })) param: { id: number },
  ): Promise<BenefitsByJobVacanciesModel[]> {
    return await this.jobVacanciesService.getJobVacanciesBenefits(param.id);
  }

  @Get('/softskills/:id')
  async getSoftSkills(
    @Param(new ValidationPipe({ transform: true })) param: { id: number },
  ): Promise<SoftSkillsByJobVacanciesModel[]> {
    return await this.jobVacanciesService.getJobVacanciesSoftSkills(param.id);
  }

  @Get('/hardskills/:id')
  async getHardSkills(
    @Param(new ValidationPipe({ transform: true })) param: { id: number },
  ): Promise<HardSkillsByJobVacanciesModel[]> {
    return await this.jobVacanciesService.getJobVacanciesHardSkills(param.id);
  }

  @Put('/pause/:id')
  async pauseJobVacancie(
    @Param(new ValidationPipe({ transform: true })) param: { id: number },
  ): Promise<JobVacanciesModel> {
    return await this.jobVacanciesService.pauseJobVacancie(param.id);
  }

  @Put('/:id')
  async updateJobVacancie(
    @Param(new ValidationPipe({ transform: true })) param: { id: number },
    @Body(new ValidationPipe({transform: true})) data: CreateJobVacanciesDTO) {
    console.log(param.id)
    return await this.jobVacanciesService.updateJobVacancie(param.id, data)
  }
}
