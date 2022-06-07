import { InjectModel } from '@nestjs/sequelize';
import { UserType } from 'src/common/enums/user-type.enum';
import { CompanyModel } from 'src/common/models/company.model';
import { UserEntity } from 'src/entities';
import { CompanyEntity } from 'src/entities/company.entity';
import { CreateCompanyDTO } from 'src/modules/company/dtos/create-company.dto';
import { UpdateCompanyDTO } from 'src/modules/company/dtos/update-company.dto';

export class CompanyRepositoryService {
  constructor(
    @InjectModel(CompanyEntity)
    private readonly companyEntity: typeof CompanyEntity,
    @InjectModel(UserEntity) private readonly userEntity: typeof UserEntity,
  ) {}

  async createCompany(data: CreateCompanyDTO): Promise<CompanyModel> {
    const transaction = await this.userEntity.sequelize.transaction();
    try {
      const user = await this.userEntity.create({
        email: data.email,
        password: data.password,
        type: UserType.COMPANY,
      });

      const companyData = {
        cnpj: data.cnpj,
        tradeName: data.tradeName,
        userID: user.id,
        corporateName: data.corporateName,
        address: data.address,
        imageURL: data.imageURL,
        linkedinURL: data.linkedinURL,
        aboutCompany: data.aboutCompany,
        type: data.type,
      };

      const company = await this.companyEntity.create(companyData);

      transaction.commit();
      return company;
    } catch (err) {
      await transaction.rollback();
      console.log(err.message);
    }
  }

  async loadAllCompanies(): Promise<CompanyModel[]> {
    return await this.companyEntity.findAll();
  }

  async getCompanyByID(id: number): Promise<CompanyModel> {
    const company = await this.companyEntity.findByPk(id);

    if (!company) return null;

    return company;
  }

  async getCompanyByEmail(email: string): Promise<CompanyModel> {
    const userCompany = await this.userEntity.findOne({ where: { email } });

    const company = await this.companyEntity.findOne({
      where: { userID: userCompany.id },
    });

    return company;
  }

  async updateCompany(
    data: UpdateCompanyDTO,
    id: number,
  ): Promise<CompanyModel> {
    const company = await this.companyEntity.findByPk(id);

    if (!data) return company;

    const companyUpdated = await company.update({ ...data });

    return companyUpdated;
  }

  async getCompanyByCNPJ(cnpj: string): Promise<CompanyModel> {
    const company = await this.companyEntity.findOne({ where: { cnpj } });

    if (!company) return null;

    return company;
  }
}
