import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HardSkillsModel } from 'src/common/models/hardSkills.model';
import { HardSkillsService } from '../services/hardSkills.service';
@ApiTags('Hard Skills')
@Controller('/hardSkills')
export class HardSkillsController {
  constructor(
    @Inject(HardSkillsService)
    private readonly hardSkillsService: HardSkillsService,
  ) {}

  @Get('/')
  async getAllHardSkills(): Promise<HardSkillsModel[]> {
    return await this.hardSkillsService.getAllHardSkills();
  }
}
