import { ApiProperty } from '@nestjs/swagger';
import { ContractTypes } from '../enums/contractType.enum';
import { LevelType } from '../enums/levelType.enum';

export class JobVacanciesModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  companyID: number;

  @ApiProperty()
  paused: boolean;

  @ApiProperty()
  title: string;

  @ApiProperty()
  salary: number;

  @ApiProperty({
    description: '1-PJ, 2- CLT, 3- CLT OU PJ, 4- OUTROS',
  })
  contractType: ContractTypes;

  @ApiProperty()
  about: string;

  @ApiProperty()
  cityAndState: string;

  @ApiProperty({
    description: '1-Estágio, 2-JR, 3-PL, 4-SR, 5-Analista, 6-Agente',
  })
  level: LevelType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
