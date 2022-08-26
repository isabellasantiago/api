import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuards } from 'src/common/decorators/roles/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { UserType } from 'src/common/enums/user-type.enum';
import { CompanyModel } from 'src/common/models/company.model';
import { JwtAuthGuard } from 'src/modules/auth/services/jwt-auth.guard';
import { CreateCompanyDTO } from '../dtos/create-company.dto';
import { UpdateCompanyDTO } from '../dtos/update-company.dto';
import { CompanyService } from '../service/company.service';

@ApiTags('Company')
@Controller('/company')
export class CompanyController {
  constructor(
    @Inject(CompanyService) private readonly companyService: CompanyService,
  ) {}

  @Post('/')
  async create(
    @Body(new ValidationPipe({ transform: true })) body: CreateCompanyDTO,
  ): Promise<CompanyModel> {
    return await this.companyService.createCompany(body);
  }

  @Get('/')
  async loadAllCompanies(): Promise<CompanyModel[]> {
    return await this.companyService.loadAllCompanies();
  }

  @Get('/:id')
  async getCompanyByID(
    @Param(new ValidationPipe({ transform: true })) param: { id: number },
  ): Promise<CompanyModel> {
    return await this.companyService.getCompanyByID(param.id);
  }

  @Get('/')
  async getCompanyByCNPJ(
    @Body(new ValidationPipe({ transform: true })) cnpj: string,
  ): Promise<CompanyModel> {
    return await this.companyService.getCompanyByCNPJ(cnpj);
  }

  @Get('/userID/:userID')
  async getCompanyByUserID(
    @Param(new ValidationPipe({ transform: true })) param: { userID: number },
  ): Promise<CompanyModel> {
    return await this.companyService.getCompanyByUserID(Number(param.userID));
  }

  @Roles(UserType.COMPANY)
  @UseGuards(JwtAuthGuard, RolesGuards)
  @Put('/:id')
  async update(
    @Body(new ValidationPipe({ transform: true })) body: UpdateCompanyDTO,
    @Param(new ValidationPipe({ transform: true })) param: { id: number },
  ): Promise<CompanyModel> {
    return await this.companyService.updateCompany(body, param.id);
  }
}
