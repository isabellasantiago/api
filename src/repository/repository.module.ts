import { Module } from '@nestjs/common';
import { InfraModule } from 'src/infra/infra.module';
import { UserEntity } from 'src/entities/user.entity';
import MySQL from '../infra/database/mysql';
import { UserRepositoryService } from './services/user/user.repository.service';
import { ValidatorRepositoryService } from './validator/validator.repository.service';
import { BcryptRepositoryService } from './bcrypt/bcrypt.repository.service';
import {
  AcademicsInformationsEntity,
  CandidateEntity,
  JobVacanciesEntity,
  PersonalDataEntity,
  PreviousJobsEntity,
} from 'src/entities';
import { CandidateRepositoryService } from './services/candidate/candidate.repository.service';
import { CompanyRepositoryService } from './services/company/company.repository.service';
import { CompanyEntity } from 'src/entities/company.entity';
import { JobVacanciesRepositoryService } from './services/jobVacancies/jobVacancies.repository.service';
import { LanguagesInformationEntity } from 'src/entities/languagesInformation.entity';
import { CvRepositoryService } from './services/cv/cv.repository.service';
import { CandidatesByJobVacancieEntity } from 'src/entities/candidatesByJobVacancie.entity';
import { CandidatesByJobVacancieRepository } from './services/candidatesByJobVacancie/candidatesByJobVacancies.repository';

@Module({
  imports: [
    MySQL.injectEntities([
      UserEntity,
      CandidateEntity,
      CompanyEntity,
      JobVacanciesEntity,
      PersonalDataEntity,
      PreviousJobsEntity,
      LanguagesInformationEntity,
      AcademicsInformationsEntity,
      CandidatesByJobVacancieEntity,
    ]),
    InfraModule,
  ],
  providers: [
    UserRepositoryService,
    CandidateRepositoryService,
    CompanyRepositoryService,
    ValidatorRepositoryService,
    BcryptRepositoryService,
    JobVacanciesRepositoryService,
    CvRepositoryService,
    CandidatesByJobVacancieRepository,
  ],
  exports: [
    UserRepositoryService,
    CandidateRepositoryService,
    CompanyRepositoryService,
    ValidatorRepositoryService,
    BcryptRepositoryService,
    JobVacanciesRepositoryService,
    CvRepositoryService,
    CandidatesByJobVacancieRepository,
  ],
})
export class RepositoryModule {}
