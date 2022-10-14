import { Body, Controller, Get, Inject, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CandidatesByJobVacancieModel } from "src/common/models/candidatesByJobVacancie.model";
import { CreateDTO } from "../dto/create.dto";
import { CandidatesByJobVacancieService } from "../service/candidatesByJobVacancie.service";

@ApiTags('Candidates by job vacancie')
@Controller('apply')
export class CandidatesByJobVacancieController {
    constructor(@Inject(CandidatesByJobVacancieService) private readonly candidatesByJobVacancieService: CandidatesByJobVacancieService){}

    @Post('/')
    async create(@Body(new ValidationPipe({ transform: true})) data: CreateDTO): Promise<CandidatesByJobVacancieModel | string> {
        return await this.candidatesByJobVacancieService.create(data);
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