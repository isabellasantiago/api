import { Inject } from '@nestjs/common';
import { SoftSkillsModel } from 'src/common/models/softSkills.model';
import { SoftSkillsRepositoryService } from 'src/repository/services/softSkills/softSkills.repository.service';

export class SoftSkillsService {
  constructor(
    @Inject(SoftSkillsRepositoryService)
    private readonly softSkillsRepository: SoftSkillsRepositoryService,
  ) {}

  async getAllSoftSkills(): Promise<SoftSkillsModel[]> {
    return await this.softSkillsRepository.getAllSoftSkills();
  }
}
