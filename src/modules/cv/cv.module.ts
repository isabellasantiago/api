import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { CvController } from './controllers/cv.controller';
import { CvService } from './services/cv.service';

@Module({
  imports: [RepositoryModule],
  providers: [CvService],
  controllers: [CvController],
})
export class CvModule {}
