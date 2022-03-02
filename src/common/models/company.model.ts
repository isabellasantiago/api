import { ApiProperty } from '@nestjs/swagger';
import { CompanyTypes } from '../enums/company-type.eum';

export class CompanyModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userID: number;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  tradeName: string;

  @ApiProperty()
  corporateName: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  imageURL: string;

  @ApiProperty()
  linkedinURL: string;

  @ApiProperty()
  aboutCompany: string;

  @ApiProperty()
  type: CompanyTypes;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
