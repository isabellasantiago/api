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
import { CvModel } from 'src/common/models/cv.model';
import { JwtAuthGuard } from 'src/modules/auth/services/jwt-auth.guard';
import { CreateOrUpdateCvDTO } from '../dto/create-cv.dto';
import { CvService } from '../services/cv.service';

@Controller('/cv')
export class CvController {
  constructor(@Inject(CvService) private readonly cvService: CvService) {}

  @Roles(UserType.CANDIDATE)
  @UseGuards(JwtAuthGuard, RolesGuards)
  @Post('/:id')
  async createCv(
    @Param(new ValidationPipe({ transform: true }))
    param: { id: number },
    @Body(new ValidationPipe({ transform: true })) data: CreateOrUpdateCvDTO,
  ): Promise<CvModel> {
    console.log('controller', data);
    return await this.cvService.createCv(data, param.id);
  }

  @Get('/:candidateID')
  async getCv(
    @Param(new ValidationPipe({ transform: true }))
    param: {
      candidateID: number;
    },
  ): Promise<CvModel> {
    return await this.cvService.getResume(param.candidateID);
  }

  @Roles(UserType.CANDIDATE)
  @UseGuards(JwtAuthGuard, RolesGuards)
  @Put('/:id')
  async updateCv(
    @Param(new ValidationPipe({ transform: true }))
    param: { id: number },
    @Body(new ValidationPipe({ transform: true })) data: CreateOrUpdateCvDTO,
  ): Promise<CvModel> {
    return await this.cvService.updateCv(data, param.id);
  }
}
