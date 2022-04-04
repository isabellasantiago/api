import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { HardSkillsController } from './controller/hardSkills.controller';
import { HardSkillsService } from './services/hardSkills.service';

@Module({
  imports: [RepositoryModule],
  providers: [HardSkillsService],
  controllers: [HardSkillsController],
})
export class HardSkillsModule {}
