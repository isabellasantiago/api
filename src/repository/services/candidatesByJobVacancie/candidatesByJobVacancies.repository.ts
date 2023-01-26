import { Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CandidateModel } from "src/common/models/candidate.model";
import { CandidatesByJobVacancieModel } from "src/common/models/candidatesByJobVacancie.model";
import { CandidateEntity, JobVacanciesEntity } from "src/entities";
import { CandidatesByJobVacancieEntity } from "src/entities/candidatesByJobVacancie.entity";
import { CreateDTO } from "src/modules/candidatesByJobVacancie/dto/create.dto";
import { CvRepositoryService } from "../cv/cv.repository.service";

export class CandidatesByJobVacancieRepository {
    constructor(
        @InjectModel(CandidatesByJobVacancieEntity) private readonly candidatesByJobVacancieEntity: typeof CandidatesByJobVacancieEntity,
        @InjectModel(CandidateEntity) private readonly candidateEntity: typeof CandidateEntity,
        @InjectModel(JobVacanciesEntity) private readonly jobVacanciesEntity: typeof JobVacanciesEntity,
        @Inject(CvRepositoryService) private readonly cvRepository: CvRepositoryService,
    ){}

    async create({jobVacancieID, candidateID, percentage = 0 }: CreateDTO): Promise<CandidatesByJobVacancieModel> {
        const candidateByJV = await this.candidatesByJobVacancieEntity.create({
            jobVacancieID,
            candidateID,
            isApplied: true,
            matchPercentage: percentage,
        })
        return candidateByJV;
    }

    async getAllCandidatesByJobVacancieID(jobVacancieID: number): Promise<CandidatesByJobVacancieModel[]> {
        const relations = await this.candidatesByJobVacancieEntity.findAll({
            where: {
                jobVacancieID,
                isApplied: true,
            },
            include: [
                {
                    model: CandidateEntity,
                    required: true,
                }
            ]
        })
    return relations
        
    }

    async getJobVacancieMatchByID(id: number): Promise<CandidatesByJobVacancieModel | undefined>{
        const jobVacancie = await this.candidatesByJobVacancieEntity.findByPk(id)

        return jobVacancie ? jobVacancie : undefined;

    }

    async getCandidates(): Promise<CandidatesByJobVacancieModel[]>{
        const candidates = await this.candidatesByJobVacancieEntity.findAll({
            include: [
                {
                    model: CandidateEntity,
                    required: true,
                },
            ]
        });

        return candidates;
    }

    async checkIfIsApplied(candidateID: number, jobVacancieID: number): Promise<CandidatesByJobVacancieModel> {
        const isApplied = await this.candidatesByJobVacancieEntity.findOne({
            where: {
                candidateID,
                jobVacancieID,
                isApplied: true,
            }
        })

        return isApplied;
    }

    async getCandidateById(candidateID: number): Promise<CandidatesByJobVacancieModel>{
        const candidate = await this.candidatesByJobVacancieEntity.findOne({
            where: { candidateID },
            include: [{
                model: CandidateEntity,
                required: true,
            }]
        })
        return candidate;
    }

    async getAllJobVacanciesByCandidate(candidateID: number): Promise<CandidatesByJobVacancieModel[]> {
        const jobVacancies = await this.candidatesByJobVacancieEntity.findAll({
            where: {
                candidateID
            },
            include: [
                {
                    model: JobVacanciesEntity,
                    required: true,
                }
            ]
        });
        return jobVacancies;
    }
    
    async updateMatch({jobVacancieID, candidateID, percentage}): Promise<CandidatesByJobVacancieModel> {
        const jobVacancieMatch = await this.candidatesByJobVacancieEntity.findOne({
            where: {
                candidateID,
                jobVacancieID
            }
        });

        const update = await jobVacancieMatch.update({...jobVacancieMatch, matchPercentage: percentage});

       return update;
    }

    async getAllJobVacancies(): Promise<CandidatesByJobVacancieModel[]>{
        return await this.candidatesByJobVacancieEntity.findAll();
    }
}