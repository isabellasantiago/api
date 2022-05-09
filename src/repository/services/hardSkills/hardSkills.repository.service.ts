import { InjectModel } from '@nestjs/sequelize';
import { HardSkillsModel } from 'src/common/models/hardSkills.model';
import { HardSkillsEntity } from 'src/entities/';

export class HardSkillsRepositoryService {
  constructor(
    @InjectModel(HardSkillsEntity)
    private readonly hardSkillsEntity: typeof HardSkillsEntity,
  ) {}

  async getAllHardSkills(): Promise<HardSkillsModel[]> {
    return await this.hardSkillsEntity.findAll();
  }
}
