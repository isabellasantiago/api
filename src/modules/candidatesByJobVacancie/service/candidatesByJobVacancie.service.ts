import { ConflictException, Inject, NotFoundException } from "@nestjs/common";
import { UserType } from "src/common/enums/user-type.enum";
import { CandidatesByJobVacancieModel } from "src/common/models/candidatesByJobVacancie.model";
import { CandidateRepositoryService } from "src/repository/services/candidate/candidate.repository.service";
import { CandidatesByJobVacancieRepository } from "src/repository/services/candidatesByJobVacancie/candidatesByJobVacancies.repository";
import { CvRepositoryService } from "src/repository/services/cv/cv.repository.service";
import { JobVacanciesRepositoryService } from "src/repository/services/jobVacancies/jobVacancies.repository.service";
import { CreateDTO } from "../dto/create.dto";
import { breakStr, compareStr } from "./factory/compare-string";

export class CandidatesByJobVacancieService {
    constructor(
        @Inject(CandidatesByJobVacancieRepository) private readonly candidatesByJobVacancieRepository: CandidatesByJobVacancieRepository,
        @Inject(JobVacanciesRepositoryService) private readonly jobVacancieRepository: JobVacanciesRepositoryService,
        @Inject(CandidateRepositoryService) private readonly candidateRepository: CandidateRepositoryService,
        @Inject(CvRepositoryService) private readonly cvRepository: CvRepositoryService,
    ){}

    async create({jobVacancieID, candidateID}: CreateDTO): Promise<CandidatesByJobVacancieModel | string>{
        const jobVacancie = await this.jobVacancieRepository.getJobVacancie(jobVacancieID);
        if(!jobVacancie) throw new NotFoundException('Job vacancie not found');

        const candidate = await this.candidateRepository.getCandidateByID(candidateID);
        if(!candidate) throw new NotFoundException('Candidate not found');

        const cv = await this.cvRepository.getResume(candidateID);
        if(!cv) throw new NotFoundException("Resume Not Found");

        const isApplied = await this.candidatesByJobVacancieRepository.getCandidateById(candidateID)
        if(isApplied) throw new ConflictException('Candidate already applied for this job opportunity')

        const titleSplitted = breakStr(jobVacancie?.title);
        const roleSplitted = breakStr(cv?.personalData?.role);

        const rolePercentage = compareStr(titleSplitted, roleSplitted);

        const experience = cv?.previousJobsInfo.length ? cv?.previousJobsInfo?.map((pv) => {
            const role = pv.role;
            const roleSpt = breakStr(role);
            return compareStr(titleSplitted, roleSpt);
        }).reduce((prev, curr) => prev + curr) : 0;

        const localSplitted = breakStr(jobVacancie?.cityAndState)
        const citySplitted = breakStr(cv?.personalData?.city);

        const localPercentage = compareStr(localSplitted, citySplitted);


        const contractJb = jobVacancie?.contractType;
        const contractPd = cv?.personalData?.contractType;
        const contractPercentage = contractPd >= contractJb ? 25 : 0;


        const levelJb = jobVacancie?.level;
        const levelPd = cv?.personalData?.level;
        const levelPercentage = levelPd >= levelJb ? 25 : 0;

        const total = rolePercentage + localPercentage + contractPercentage + levelPercentage + experience;

        const match = await this.candidatesByJobVacancieRepository.create({jobVacancieID, candidateID, percentage: Number(total)})

        return match;
    }

    async getCandidates(): Promise<CandidatesByJobVacancieModel[]>{
        const candidates = await this.candidatesByJobVacancieRepository.getCandidates();
        return candidates;
    }

    async getCandidateById(candidateID: number): Promise<CandidatesByJobVacancieModel> {
        const candidateExists = await this.candidateRepository.getCandidateByID(candidateID);
        if(!candidateExists) throw new NotFoundException('Candidate not found');

        const candidate = await this.candidatesByJobVacancieRepository.getCandidateById(candidateID);

        return candidate
    }

    async getAllJobVacanciesByCandidate(candidateID: number): Promise<CandidatesByJobVacancieModel[]> {
        const candidate = await this.candidateRepository.getCandidateByID(candidateID);
        if(!candidate) throw new NotFoundException('Candidate not found');

        const jobVacancies = await this.candidatesByJobVacancieRepository.getAllJobVacanciesByCandidate(candidateID);
        return jobVacancies;
    }

    async updateMatch({jobVacancieID, candidateID}): Promise<boolean>{
        const candidate = await this.candidateRepository.getCandidateByID(candidateID);
        if(!candidate) throw new NotFoundException("Candidate Not Found")

        const jobVacancie = await this.jobVacancieRepository.getJobVacancie(jobVacancieID);
        if(!jobVacancie) throw new NotFoundException('Job Vacancie Not Found');

        const cv = await this.cvRepository.getResume(candidate.id);
        if(!cv) throw new NotFoundException("Resume Not Found");

        const application = await this.candidatesByJobVacancieRepository.getCandidateById(candidate.id);
        if(!application) throw new NotFoundException("Candidate Not Applied");

        const titleSplitted = breakStr(jobVacancie?.title);
        const roleSplitted = breakStr(cv?.personalData?.role);

        const rolePercentage = compareStr(titleSplitted, roleSplitted);

        const experience = cv?.previousJobsInfo.length ? cv?.previousJobsInfo?.map((pv) => {
            const role = pv.role;
            const roleSpt = breakStr(role);
            return compareStr(titleSplitted, roleSpt);
        }).reduce((prev, curr) => prev + curr) : 0;

        const localSplitted = breakStr(jobVacancie?.cityAndState)
        const citySplitted = breakStr(cv?.personalData?.city);

        const localPercentage = compareStr(localSplitted, citySplitted)


        const contractJb = jobVacancie?.contractType;
        const contractPd = cv?.personalData?.contractType;
        const contractPercentage = contractPd >= contractJb ? 25 : 0;


        const levelJb = jobVacancie?.level;
        const levelPd = cv?.personalData?.level;
        const levelPercentage = levelPd >= levelJb ? 25 : 0;

        const total = rolePercentage + localPercentage + contractPercentage + levelPercentage + experience;


        const updated = await this.candidatesByJobVacancieRepository.updateMatch({jobVacancieID, candidateID, percentage: total});

        return updated ? true : false;
    }
}