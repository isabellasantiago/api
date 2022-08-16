import { InjectModel } from '@nestjs/sequelize';
import { UserType } from 'src/common/enums/user-type.enum';
import { CandidateModel } from 'src/common/models/candidate.model';
import { CandidateEntity, UserEntity } from 'src/entities';
import { CreateCandidateDTO } from '../../../modules/candidate/dto/create-candidate.dto';
import { UpdateCandidateDTO } from '../../../modules/candidate/dto/update-candidate.dto';

export class CandidateRepositoryService {
  constructor(
    @InjectModel(CandidateEntity)
    private readonly candidateEntity: typeof CandidateEntity,
    @InjectModel(UserEntity) private readonly userEntity: typeof UserEntity,
  ) {}

  async getCandidateByCPF(cpf: string): Promise<CandidateModel> {
    const candidate = await this.candidateEntity.findOne({ where: { cpf } });

    return candidate;
  }

  async createCandidate(data: CreateCandidateDTO): Promise<CandidateModel> {
    const transaction = await this.userEntity.sequelize.transaction();
    try {
      const user = await this.userEntity.create({
        email: data.email,
        password: data.password,
        type: UserType.CANDIDATE,
      });
      const candidate = await this.candidateEntity.create({
        name: data.name,
        lastName: data.lastName,
        cpf: data.cpf,
        phone: data.phone,
        userID: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      transaction.commit();
      return candidate;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async getCandidateByID(id: number): Promise<CandidateModel> {
    return await this.candidateEntity.findByPk(id);
  }

  async getCandidateByUserID(userID: number): Promise<CandidateModel> {
    const company = await this.candidateEntity.findOne({
      where: {
        userID,
      },
    });
    return company;
  }

  async loadAllCandidates(): Promise<CandidateModel[]> {
    return await this.candidateEntity.findAll();
  }

  async updateCandidate(
    data: UpdateCandidateDTO,
    id: number,
  ): Promise<CandidateModel> {
    const candidate = await this.candidateEntity.findByPk(id);
    const candidateUpdated = await candidate.update({ ...data });

    return candidateUpdated;
  }

  async deleteCandidate(id: number): Promise<boolean> {
    const candidateDeleted = await this.candidateEntity.destroy({
      where: { id },
    });

    if (candidateDeleted) return true;

    return false;
  }
}
