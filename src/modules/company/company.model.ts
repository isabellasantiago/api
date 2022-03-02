import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './service/company.service';

@Module({
  imports: [RepositoryModule],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
