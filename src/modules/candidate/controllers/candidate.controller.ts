import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CandidateModel } from 'src/common/models/candidate.model';
import { CreateCandidateDTO } from '../dto/create-candidate.dto';
import { UpdateCandidateDTO } from '../dto/update-candidate.dto';
import { CandidateService } from '../service/candidate.service';

@Controller('/candidate')
export class CandidateController {
  constructor(
    @Inject(CandidateService)
    private readonly candidateService: CandidateService,
  ) {}

  @Post('/')
  async createCandidate(
    @Body(new ValidationPipe({ transform: true })) data: CreateCandidateDTO,
  ): Promise<CandidateModel> {
    return await this.candidateService.createCandidate(data);
  }

  @Get('/')
  async loadAllCandidates(): Promise<CandidateModel[]> {
    return await this.candidateService.loadAllCandidates();
  }

  @Get('/:id')
  async getCandidateByID(
    @Param(new ValidationPipe({ transform: true })) params: { id: number },
  ) {
    return await this.candidateService.getCandidateByID(params.id);
  }

  @Put('/:id')
  async updateCandidate(
    @Body(new ValidationPipe({ transform: true })) body: UpdateCandidateDTO,
    @Param(new ValidationPipe({ transform: true })) params: { id: number },
  ) {
    return await this.candidateService.updateCandidate(body, params.id);
  }

  @Delete('/:id')
  async deleteCandidate(
    @Param(new ValidationPipe({ transform: true })) params: { id: number },
  ): Promise<boolean> {
    return await this.candidateService.deleteCandidate(params.id);
  }
}
