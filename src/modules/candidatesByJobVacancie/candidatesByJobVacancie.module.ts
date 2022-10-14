import { Module } from "@nestjs/common";
import { RepositoryModule } from "src/repository/repository.module";
import { CandidatesByJobVacancieController } from "./controller/candidatesByJobVacancie.controller";
import { CandidatesByJobVacancieService } from "./service/candidatesByJobVacancie.service";

@Module({
    imports: [RepositoryModule],
    providers: [CandidatesByJobVacancieService],
    controllers: [CandidatesByJobVacancieController]
})

export class CandidatesByJobVacancieModule {}