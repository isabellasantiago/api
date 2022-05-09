import {
  BadRequestException,
  ConflictException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { PersonalDataModel } from 'src/common/models/personalData.model';
import { CandidateRepositoryService } from 'src/repository/services/candidate/candidate.repository.service';
import { CvRepositoryService } from 'src/repository/services/cv/cv.repository.service';
import { CreateOrUpdateCvDTO } from '../dto/create-cv.dto';
import { ICv } from '../dto/cv-complete.output';

export class CvService {
  constructor(
    @Inject(CvRepositoryService)
    private readonly cvRepository: CvRepositoryService,
    @Inject(CandidateRepositoryService)
    private readonly candidateRepository: CandidateRepositoryService,
  ) {}

  async createCv(data: CreateOrUpdateCvDTO): Promise<PersonalDataModel> {
    const candidate = await this.candidateRepository.getCandidateByID(
      data.candidateID,
    );
    const cvAlreadyExists = await this.cvRepository.getPersonalData(
      candidate.id,
    );

    if (cvAlreadyExists)
      throw new ConflictException('Curriculum already exists');

    if (!candidate) throw new NotFoundException('Candidate not found');

    if (!data) throw new BadRequestException('Invalid params');

    if (!data.birthDate) throw new BadRequestException('Invalid birth date');

    if (!data.hardSkills)
      throw new BadRequestException('Soft skills are required');

    if (!data.hardSkills)
      throw new BadRequestException('Hard skills are required');

    const personalData = await this.cvRepository.createCv(data);

    return personalData;
  }

  async getCompleteCv(candidateID: number): Promise<ICv> {
    const candidate = await this.candidateRepository.getCandidateByID(
      candidateID,
    );

    if (!candidate) throw new NotFoundException('Candiadate Not Found');

    const personalData = await this.cvRepository.getPersonalData(candidateID);

    if (!personalData)
      throw new NotFoundException('This candidate has no resume');

    const academics = await this.cvRepository.getAllAcademics(candidateID);

    const languages = await this.cvRepository.getAllLanguages(candidateID);

    const previousJobs = await this.cvRepository.getAllPreviousJobs(
      candidateID,
    );

    const softSkills = await this.cvRepository.getAllSoftSkills(candidateID);

    const hardSkills = await this.cvRepository.getAllHardSkills(candidateID);

    const cv = {
      personalData,
      academics,
      languages,
      previousJobs,
      softSkills,
      hardSkills,
    };

    return cv;
  }

  async updateCv(data: CreateOrUpdateCvDTO): Promise<ICv> {
    const {
      candidateID,
      imageURL,
      linkedinURL,
      naturalness,
      gender,
      birthDate,
      state,
      city,
      phone,
      ethnicity,
      isPcd,
      allowsWhatsapp,
      field,
      contractType,
      level,
      role,
      academics,
      languages,
      previousJobs,
      softSkills,
      hardSkills,
    } = data;
    const candidate = await this.candidateRepository.getCandidateByID(
      candidateID,
    );

    if (!candidate) throw new NotFoundException('Candidate not found');

    const cvAlreadyExists = await this.cvRepository.getPersonalData(
      candidateID,
    );

    if (!cvAlreadyExists) throw new NotFoundException('Curriculum not found');


    return await this.cvRepository.updateCv({
      candidateID,
      imageURL,
      linkedinURL,
      naturalness,
      gender,
      birthDate,
      state,
      city,
      phone,
      ethnicity,
      isPcd,
      allowsWhatsapp,
      field,
      contractType,
      level,
      role,
      academics,
      languages,
      previousJobs,
      softSkills,
      hardSkills,
    })
  }
}
