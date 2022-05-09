import { Module } from '@nestjs/common';
import MySQL from './infra/database/mysql';
import { AppController } from './modules/app/controllers/app.controller';
import { AppService } from './modules/app/service/app.service';
import { CandidateModule } from './modules/candidate/candidate.module';
import { CompanyModule } from './modules/company/company.module';
import { CvModule } from './modules/cv/cv.module';
import { HardSkillsModule } from './modules/hardSkills/hardSkills.module';
import { JobVacanciesModule } from './modules/jobVacancies/jobVacancies.module';
import { SoftSkillsModule } from './modules/softSkills/softSkills.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    MySQL.connect(),
    AppModule,
    UserModule,
    CandidateModule,
    CompanyModule,
    JobVacanciesModule,
    HardSkillsModule,
    SoftSkillsModule,
    CvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
