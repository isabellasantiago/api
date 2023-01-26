import { Module } from '@nestjs/common';
import MySQL from './infra/database/mysql';
import { AppController } from './modules/app/controllers/app.controller';
import { AppService } from './modules/app/service/app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CandidateModule } from './modules/candidate/candidate.module';
import { CandidatesByJobVacancieModule } from './modules/candidatesByJobVacancie/candidatesByJobVacancie.module';
import { CompanyModule } from './modules/company/company.module';
import { CvModule } from './modules/cv/cv.module';
import { JobVacanciesModule } from './modules/jobVacancies/jobVacancies.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    MySQL.connect(),
    AppModule,
    UserModule,
    CandidateModule,
    CompanyModule,
    JobVacanciesModule,
    CvModule,
    AuthModule,
    CandidatesByJobVacancieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
