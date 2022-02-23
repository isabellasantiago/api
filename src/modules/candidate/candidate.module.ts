import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { CandidateController } from './controllers/candidate.controller';
import { CandidateService } from './service/candidate.service';

@Module({
  imports: [RepositoryModule],
  providers: [CandidateService],
  controllers: [CandidateController],
})
export class CandidateModule {}
