import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { RolesGuards } from 'src/common/decorators/roles/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { UserType } from 'src/common/enums/user-type.enum';
import { PersonalDataModel } from 'src/common/models/personalData.model';
import { JwtAuthGuard } from 'src/modules/auth/services/jwt-auth.guard';
import { CreateOrUpdateCvDTO } from '../dto/create-cv.dto';
import { ICv } from '../dto/cv-complete.output';
import { CvService } from '../services/cv.service';

@Controller('/cv')
export class CvController {
  constructor(@Inject(CvService) private readonly cvService: CvService) {}

  @Roles(UserType.CANDIDATE)
  @UseGuards(JwtAuthGuard, RolesGuards)
  @Post('/')
  async createCv(
    @Body(new ValidationPipe({ transform: true })) data: CreateOrUpdateCvDTO,
  ): Promise<PersonalDataModel> {
    return await this.cvService.createCv(data);
  }

  @Get('/:candidateID')
  async getCv(
    @Param(new ValidationPipe({ transform: true }))
    param: {
      candidateID: number;
    },
  ): Promise<ICv> {
    return await this.cvService.getCompleteCv(param.candidateID);
  }

  @Roles(UserType.CANDIDATE)
  @UseGuards(JwtAuthGuard, RolesGuards)
  @Put('/')
  async updateCv(@Body(new ValidationPipe({ transform: true})) data: CreateOrUpdateCvDTO): Promise<ICv> {
    return await this.cvService.updateCv(data)
  }
}
