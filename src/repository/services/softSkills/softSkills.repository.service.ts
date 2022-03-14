import { InjectModel } from '@nestjs/sequelize';
import { SoftSkillsModel } from 'src/common/models/softSkills.model';
import { SoftSkillsEntity } from 'src/entities/softSkills.entity';

export class SoftSkillsRepositoryService {
  constructor(
    @InjectModel(SoftSkillsEntity)
    private readonly softSkillsEntity: typeof SoftSkillsEntity,
  ) {}

  async getAllSoftSkills(): Promise<SoftSkillsModel[]> {
    return await this.softSkillsEntity.findAll();
  }
}
