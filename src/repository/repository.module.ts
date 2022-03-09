import { Module } from '@nestjs/common';
import { InfraModule } from 'src/infra/infra.module';
import { UserEntity } from 'src/entities/user.entity';
import MySQL from '../infra/database/mysql';
import { UserRepositoryService } from './services/user/user.repository.service';
import { ValidatorRepositoryService } from './validator/validator.repository.service';
import { BcryptRepositoryService } from './bcrypt/bcrypt.repository.service';
import {
  CandidateEntity,
  JobRequirementsEntity,
  JobVacanciesByCompanyEntity,
  JobVacanciesEntity,
  RequirementsByJobVacanciesEntity,
} from 'src/entities';
import { CandidateRepositoryService } from './services/candidate/candidate.repository.service';
import { CompanyRepositoryService } from './services/company/company.repository.service';
import { CompanyEntity } from 'src/entities/company.entity';
import { JobBenefitsEntity } from 'src/entities/jobBenefits.entity';
import { BenefitsByJobVacanciesEntity } from 'src/entities/benefitsByJobVacancies.entity';

@Module({
  imports: [
    MySQL.injectEntities([
      UserEntity,
      CandidateEntity,
      CompanyEntity,
      JobVacanciesByCompanyEntity,
      JobVacanciesEntity,
      JobRequirementsEntity,
      JobBenefitsEntity,
      RequirementsByJobVacanciesEntity,
      BenefitsByJobVacanciesEntity,
    ]),
    InfraModule,
  ],
  providers: [
    UserRepositoryService,
    CandidateRepositoryService,
    CompanyRepositoryService,
    ValidatorRepositoryService,
    BcryptRepositoryService,
  ],
  exports: [
    UserRepositoryService,
    CandidateRepositoryService,
    CompanyRepositoryService,
    ValidatorRepositoryService,
    BcryptRepositoryService,
  ],
})
export class RepositoryModule {}
