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
  HardSkillsByCandidateEntity,
  JobRequirementsEntity,
  JobVacanciesEntity,
  PersonalDataEntity,
  PreviousJobsEntity,
  RequirementsByJobVacanciesEntity,
  SoftSkillsByCandidateEntity,
} from 'src/entities';
import { CandidateRepositoryService } from './services/candidate/candidate.repository.service';
import { CompanyRepositoryService } from './services/company/company.repository.service';
import { CompanyEntity } from 'src/entities/company.entity';
import { JobBenefitsEntity } from 'src/entities/jobBenefits.entity';
import { BenefitsByJobVacanciesEntity } from 'src/entities/benefitsByJobVacancies.entity';
import { SoftSkillsEntity } from 'src/entities/softSkills.entity';
import { HardSkillsEntity } from 'src/entities/hardSkills.entity';
import { SoftSkillsByJobVacanciesEntity } from 'src/entities/softSkillsByJobVacancies.entity';
import { HardSkillsByJobVacanciesEntity } from 'src/entities/hardSkillsByJobVacancies.entity';
import { JobVacanciesRepositoryService } from './services/jobVacancies/jobVacancies.repository.service';
import { HardSkillsRepositoryService } from './services/hardSkills/hardSkills.repository.service';
import { SoftSkillsRepositoryService } from './services/softSkills/softSkills.repository.service';
import { LanguagesInformationEntity } from 'src/entities/languagesInformation.entity';
import { CvRepositoryService } from './services/cv/cv.repository.service';

@Module({
  imports: [
    MySQL.injectEntities([
      UserEntity,
      CandidateEntity,
      CompanyEntity,
      JobVacanciesEntity,
      JobRequirementsEntity,
      JobBenefitsEntity,
      RequirementsByJobVacanciesEntity,
      BenefitsByJobVacanciesEntity,
      SoftSkillsEntity,
      HardSkillsEntity,
      SoftSkillsByJobVacanciesEntity,
      HardSkillsByJobVacanciesEntity,
      SoftSkillsByCandidateEntity,
      HardSkillsByCandidateEntity,
      PersonalDataEntity,
      PreviousJobsEntity,
      LanguagesInformationEntity,
      AcademicsInformationsEntity,
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
    HardSkillsRepositoryService,
    SoftSkillsRepositoryService,
    CvRepositoryService,
  ],
  exports: [
    UserRepositoryService,
    CandidateRepositoryService,
    CompanyRepositoryService,
    ValidatorRepositoryService,
    BcryptRepositoryService,
    JobVacanciesRepositoryService,
    HardSkillsRepositoryService,
    SoftSkillsRepositoryService,
    CvRepositoryService,
  ],
})
export class RepositoryModule {}
