import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { JobVacancieController } from './controllers/jobVacancies.controller';
import { JobVacanciesService } from './services/jobVacancies.service';

@Module({
  imports: [RepositoryModule],
  providers: [JobVacanciesService],
  controllers: [JobVacancieController],
})
export class JobVacanciesModule {}
