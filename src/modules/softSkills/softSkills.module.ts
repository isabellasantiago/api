import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { SoftSkillsController } from './controller/softSkills.controller';
import { SoftSkillsService } from './services/softSkills.service';

@Module({
  imports: [RepositoryModule],
  providers: [SoftSkillsService],
  controllers: [SoftSkillsController],
})
export class SoftSkillsModule {}
