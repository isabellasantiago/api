import { ApiProperty } from '@nestjs/swagger';
import { ContractTypes } from '../enums/contractType.enum';
import { LevelType } from '../enums/levelType.enum';

export class PersonalDataModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  candidateID: number;

  @ApiProperty()
  imageURL: string;

  @ApiProperty()
  linkedinURL: string;

  @ApiProperty()
  naturalness: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  state: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  field: string;

  @ApiProperty({
    description: '1-PJ, 2- CLT, 3- CLT OU PJ, 4- OUTROS',
  })
  contractType: ContractTypes;

  @ApiProperty({
    description: '1- Estágio, 2- JR, 3- PL, 4- SR, 5- Analista, 6 - Agente',
  })
  level: LevelType;

  @ApiProperty()
  role: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
