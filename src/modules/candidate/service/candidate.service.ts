import {
  BadRequestException,
  ConflictException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { BcryptRepositoryService } from 'src/repository/bcrypt/bcrypt.repository.service';
import { CandidateRepositoryService } from 'src/repository/services/candidate/candidate.repository.service';
import { UserRepositoryService } from 'src/repository/services/user/user.repository.service';
import { ValidatorRepositoryService } from 'src/repository/validator/validator.repository.service';
import { CandidateModel } from '../../../common/models/candidate.model';
import { CreateCandidateDTO } from '../dto/create-candidate.dto';
import { UpdateCandidateDTO } from '../dto/update-candidate.dto';

export class CandidateService {
  constructor(
    @Inject(CandidateRepositoryService)
    private readonly candidateRepository: CandidateRepositoryService,
    @Inject(UserRepositoryService)
    private readonly userRepository: UserRepositoryService,
    @Inject(ValidatorRepositoryService)
    private readonly validatorRepository: ValidatorRepositoryService,
    @Inject(BcryptRepositoryService)
    private readonly bcryptRepository: BcryptRepositoryService,
  ) {}

  async createCandidate(data: CreateCandidateDTO): Promise<CandidateModel> {
    if (!data) throw new BadRequestException('Invalid params');

    const candidateAlreadyExists =
      await this.candidateRepository.getCandidateByCPF(data.cpf);

    if (candidateAlreadyExists)
      throw new ConflictException('Candidate already registered');

    const isEmailValid = this.validatorRepository.isEmail(data.email);
    if (!isEmailValid) throw new BadRequestException('Email is invalid');

    const isCpfValid = this.validatorRepository.isCpf(data.cpf);
    if (!isCpfValid) throw new BadRequestException('CPF is invalid');

    const isPhoneValid = data.phone.length === 11 ? true : false;

    if (!isPhoneValid)
      throw new BadRequestException('Phone must have 11 characteres');

    const cryptPassword = this.bcryptRepository.crypt(data.password);

    return await this.candidateRepository.createCandidate({
      ...data,
      password: cryptPassword,
    });
  }

  async loadAllCandidates(): Promise<CandidateModel[]> {
    return await this.candidateRepository.loadAllCandidates();
  }

  async getCandidateByID(id: number): Promise<CandidateModel> {
    return await this.candidateRepository.getCandidateByID(id);
  }

  async updateCandidate(
    data: UpdateCandidateDTO,
    id: number,
  ): Promise<CandidateModel> {
    const candidate = await this.candidateRepository.getCandidateByID(id);
    if (!candidate) throw new NotFoundException('Candidate not found');

    if (data.phone) {
      const isPhoneValid = data.phone.length === 11 ? true : false;

      if (!isPhoneValid)
        throw new BadRequestException('Phone must have 11 characteres');
    }

    return await this.candidateRepository.updateCandidate({ ...data }, id);
  }

  async deleteCandidate(id: number): Promise<boolean> {
    const candidate = this.candidateRepository.getCandidateByID(id);
    if (!candidate) throw new NotFoundException('Candidate not found');

    const user = await this.userRepository.getUserByID(
      (
        await candidate
      ).userID,
    );

    await this.userRepository.deleteUser(user.id);
    return await this.candidateRepository.deleteCandidate(id);
  }
}
