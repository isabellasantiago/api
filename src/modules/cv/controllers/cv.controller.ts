import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PersonalDataModel } from 'src/common/models/personalData.model';
import { CreateCvDTO } from '../dto/create-cv-.dto';
import { ICv } from '../dto/cv-complete.output';
import { CvService } from '../services/cv.service';

@Controller('/cv')
export class CvController {
  constructor(@Inject(CvService) private readonly cvService: CvService) {}

  @Post('/')
  async createCv(
    @Body(new ValidationPipe({ transform: true })) data: CreateCvDTO,
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
}
