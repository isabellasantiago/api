import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuards } from 'src/common/decorators/roles/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { UserType } from 'src/common/enums/user-type.enum';
import { JobVacanciesModel } from 'src/common/models/jobVacancies.model';
import { JwtAuthGuard } from 'src/modules/auth/services/jwt-auth.guard';
import { CreateJobVacanciesDTO } from '../dtos/create-jobVacancies.dto';
import { JobVacanciesService } from '../services/jobVacancies.service';

@ApiTags('Job Vacancie')
@Controller('jobVacancie')
export class JobVacancieController {
  constructor(
    @Inject(JobVacanciesService)
    private readonly jobVacanciesService: JobVacanciesService,
  ) {}

  @Roles(UserType.COMPANY)
  @UseGuards(JwtAuthGuard, RolesGuards)
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

  @Roles(UserType.COMPANY)
  @UseGuards(JwtAuthGuard, RolesGuards)
  @Put('/pause/:id')
  async pauseJobVacancie(
    @Param(new ValidationPipe({ transform: true })) param: { id: number },
  ): Promise<JobVacanciesModel> {
    return await this.jobVacanciesService.pauseJobVacancie(param.id);
  }

  @Roles(UserType.COMPANY)
  @UseGuards(JwtAuthGuard, RolesGuards)
  @Put('/:id')
  async updateJobVacancie(
    @Param(new ValidationPipe({ transform: true })) param: { id: number },
    @Body(new ValidationPipe({ transform: true })) data: CreateJobVacanciesDTO,
  ) {
    return await this.jobVacanciesService.updateJobVacancie(param.id, data);
  }

  @Roles(UserType.COMPANY)
  @UseGuards(JwtAuthGuard, RolesGuards)
  @Delete('/:id')
  async deleteJobVacancie(
    @Param(new ValidationPipe({ transform: true })) param: { id: number },
  ): Promise<boolean> {
    return await this.jobVacanciesService.deleteJobVacancie(param.id);
  }
}
