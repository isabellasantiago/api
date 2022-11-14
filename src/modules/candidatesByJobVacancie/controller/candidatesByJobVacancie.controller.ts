import { Body, Controller, Get, Inject, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CandidatesByJobVacancieModel } from "src/common/models/candidatesByJobVacancie.model";
import { AllCandidatesByJobVacancieID } from "../dto/all-candidates-by-jobVacancieID.dto";
import { CreateDTO } from "../dto/create.dto";
import { JobVacancieMatchDTO } from "../dto/job-vacancie-match.dto";
import { CandidatesByJobVacancieService } from "../service/candidatesByJobVacancie.service";

@ApiTags('Candidates by job vacancie')
@Controller('apply')
export class CandidatesByJobVacancieController {
    constructor(@Inject(CandidatesByJobVacancieService) private readonly candidatesByJobVacancieService: CandidatesByJobVacancieService){}

    @Post('/')
    async create(@Body(new ValidationPipe({ transform: true})) data: CreateDTO): Promise<CandidatesByJobVacancieModel | string> {
        return await this.candidatesByJobVacancieService.create(data);
    }

    @Get('/:candidateID/possible-match')
    async getNewJobVacancies(@Param(new ValidationPipe({ transform: true}))param: { candidateID: number }): Promise<JobVacancieMatchDTO[]> {
        return await this.candidatesByJobVacancieService.getNewJobVacancies(param.candidateID);
    }

    @Get('/:jobVacancieID/candidates')
    async getAllCandidatesByJobVacancie(
        @Param(new ValidationPipe({ transform: true})) param: { jobVacancieID: number}
    ): Promise<AllCandidatesByJobVacancieID[]> {
        return await this.candidatesByJobVacancieService.getAllCandidatesByJobVacancieID(param.jobVacancieID);
    }

    @Get('/')
    async getAllCandidates(): Promise<CandidatesByJobVacancieModel[]> {
        return await this.candidatesByJobVacancieService.getCandidates();
    }

    @Get('/:candidateID')
    async getCandidateById(@Param(new ValidationPipe({ transform: true })) param: {candidateID: number}): Promise<CandidatesByJobVacancieModel> {
        return await this.candidatesByJobVacancieService.getCandidateById(param.candidateID);
    }

    @Get('/:candidateID/all')
    async getAllJobVacanciesByCandidate(@Param(new ValidationPipe({ transform: true })) param: {candidateID: number}): Promise<CandidatesByJobVacancieModel[]> {
        return await this.candidatesByJobVacancieService.getAllJobVacanciesByCandidate(param.candidateID);
    }

    @Patch('/')
    async updateMatch(@Body(new ValidationPipe({ transform: true }))data : CreateDTO): Promise<boolean>{
        return await this.candidatesByJobVacancieService.updateMatch(data);
    }
}