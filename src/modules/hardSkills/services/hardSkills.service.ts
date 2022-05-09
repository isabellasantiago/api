import { Inject } from '@nestjs/common';
import { HardSkillsModel } from 'src/common/models/hardSkills.model';
import { HardSkillsRepositoryService } from 'src/repository/services/hardSkills/hardSkills.repository.service';

export class HardSkillsService {
  constructor(
    @Inject(HardSkillsRepositoryService)
    private readonly hardSkillsRepository: HardSkillsRepositoryService,
  ) {}

  async getAllHardSkills(): Promise<HardSkillsModel[]> {
    const hardskills = await this.hardSkillsRepository.getAllHardSkills();

    if(!hardskills) throw new Error('None hard skills were found')
    return hardskills
  }
}
