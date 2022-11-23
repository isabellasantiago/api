import {
  BadRequestException,
  ConflictException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { CvModel } from 'src/common/models/cv.model';
import { CandidateRepositoryService } from 'src/repository/services/candidate/candidate.repository.service';
import { CvRepositoryService } from 'src/repository/services/cv/cv.repository.service';
import { CreateOrUpdateCvDTO } from '../dto/create-cv.dto';

export class CvService {
  constructor(
    @Inject(CvRepositoryService)
    private readonly cvRepository: CvRepositoryService,
    @Inject(CandidateRepositoryService)
    private readonly candidateRepository: CandidateRepositoryService,
  ) {}

  async createCv(
    data: CreateOrUpdateCvDTO,
    candidateID: number,
  ): Promise<CvModel> {
    if (!data) throw new BadRequestException('Invalid params');
    const candidate = await this.candidateRepository.getCandidateByID(
      candidateID,
    );
    if (!candidate) throw new NotFoundException('Candidate not found');

    const cvAlreadyExists = await this.cvRepository.getPersonalData(
      candidate.id,
    );
    if (cvAlreadyExists)
      throw new ConflictException('Curriculum already exists');


    if (!data.birthDate) throw new BadRequestException('Invalid birth date');

    const cv = await this.cvRepository.createCv({
        ...data,
        phone: candidate.phone,
      },
      candidateID,
    );

    return cv;
  }

  async getResume(candidateID: number): Promise<CvModel> {
    const candidate = await this.candidateRepository.getCandidateByID(
      candidateID,
    );

    if (!candidate) throw new NotFoundException('Candiadate Not Found');

    const cv = await this.cvRepository.getResume(candidateID);

    return cv;
  }

  async updateCv(
    data: CreateOrUpdateCvDTO,
    candidateID: number,
  ): Promise<CvModel> {
    const {
      imageURL,
      linkedinURL,
      naturalness,
      birthDate,
      state,
      city,
      phone,
      field,
      contractType,
      level,
      role,
      academics,
      languages,
      previousJobs,
    } = data;
    const candidate = await this.candidateRepository.getCandidateByID(
      candidateID,
    );

    if (!candidate) throw new NotFoundException('Candidate not found');

    const cvAlreadyExists = await this.cvRepository.getPersonalData(
      candidateID,
    );

    if (!cvAlreadyExists) throw new NotFoundException('Curriculum not found');

    return await this.cvRepository.updateCv(
      {
        imageURL,
        linkedinURL,
        naturalness,
        birthDate,
        state,
        city,
        phone,
        field,
        contractType,
        level,
        role,
        academics,
        languages,
        previousJobs,
      },
      candidateID,
    );
  }
}
