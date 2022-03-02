import { CompanyRepositoryService } from 'src/repository/services/company/company.repository.service';
import { CreateCompanyDTO } from '../dtos/create-company.dto';

import {
  BadRequestException,
  ConflictException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { CompanyModel } from 'src/common/models/company.model';
import { ValidatorRepositoryService } from 'src/repository/validator/validator.repository.service';
import { BcryptRepositoryService } from 'src/repository/bcrypt/bcrypt.repository.service';
import { UpdateCompanyDTO } from '../dtos/update-company.dto';
import { UserRepositoryService } from 'src/repository/services/user/user.repository.service';

export class CompanyService {
  constructor(
    @Inject(CompanyRepositoryService)
    private readonly companyRepository: CompanyRepositoryService,
    @Inject(UserRepositoryService)
    private readonly userRepository: UserRepositoryService,
    @Inject(ValidatorRepositoryService)
    private readonly validatorRepository: ValidatorRepositoryService,
    @Inject(BcryptRepositoryService)
    private readonly bcrypt: BcryptRepositoryService,
  ) {}

  async createCompany(data: CreateCompanyDTO): Promise<CompanyModel> {
    if (!data) throw new BadRequestException('Invalid params');

    const emailAlreadyRegistered = await this.userRepository.getUserByEmail(
      data.email,
    );

    const companyAlreadyExists = await this.companyRepository.getCompanyByCNPJ(
      data.cnpj,
    );
    if (emailAlreadyRegistered || companyAlreadyExists)
      throw new ConflictException('Company already exists');

    const isCNPJValid = this.validatorRepository.isCNPJ(data.cnpj);
    if (!isCNPJValid) throw new BadRequestException('CNPJ is invalid');

    const isEmailValid = this.validatorRepository.isEmail(data.email);
    if (!isEmailValid) throw new BadRequestException('Invalid email');

    const passwordCrypted = this.bcrypt.crypt(data.password);

    const company = await this.companyRepository.createCompany({
      ...data,
      password: passwordCrypted,
    });

    return company;
  }

  async loadAllCompanies(): Promise<CompanyModel[]> {
    return await this.companyRepository.loadAllCompanies();
  }

  async getCompanyByID(id: number): Promise<CompanyModel> {
    const company = await this.companyRepository.getCompanyByID(id);

    if (!company) throw new NotFoundException('Company not found');

    return company;
  }

  async getCompanyByCNPJ(cnpj: string): Promise<CompanyModel> {
    console.log(cnpj);
    const company = await this.companyRepository.getCompanyByCNPJ(cnpj);

    console.log(cnpj);

    if (!company) throw new NotFoundException('Company not found');

    return company;
  }

  async updateCompany(
    data: UpdateCompanyDTO,
    id: number,
  ): Promise<CompanyModel> {
    if (!data) throw new BadRequestException('Invalid params');
    const companyExists = await this.companyRepository.getCompanyByID(id);

    if (!companyExists) throw new NotFoundException('Company not found');

    const companyUpdated = await this.companyRepository.updateCompany(data, id);

    return companyUpdated;
  }
}
