import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SoftSkillsModel } from 'src/common/models/softSkills.model';
import { SoftSkillsService } from '../services/softSkills.service';

@ApiTags('Soft Skills')
@Controller('/softSkills')
export class SoftSkillsController {
  constructor(
    @Inject(SoftSkillsService)
    private readonly softSkillsService: SoftSkillsService,
  ) {}

  @Get('/')
  async getAllSoftSkills(): Promise<SoftSkillsModel[]> {
    return this.softSkillsService.getAllSoftSkills();
  }
}
