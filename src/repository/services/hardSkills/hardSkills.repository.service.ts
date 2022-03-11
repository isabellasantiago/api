import { InjectModel } from '@nestjs/sequelize';
import { HardSkillsModel } from 'src/common/models/hardSkills.model';
import { HardSkillsEntity } from 'src/entities/';

export class SoftSkillsRepositoryService {
  constructor(
    @InjectModel(HardSkillsEntity)
    private readonly softSkillsEntity: typeof HardSkillsEntity,
  ) {}

  async getAllSoftSkills(): Promise<HardSkillsModel[]> {
    return await this.softSkillsEntity.findAll();
  }
}
