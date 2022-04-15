import { ApiProperty } from '@nestjs/swagger';
import { ContractTypes } from '../enums/contractType.enum';
import { EthnicityTypes } from '../enums/ethnicityTypes.enum';
import { GenderTypes } from '../enums/genderTypes.enum';
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

  @ApiProperty()
  contractType: ContractTypes;

  @ApiProperty()
  about: string;

  @ApiProperty()
  cityAndState: string;

  @ApiProperty({
    description: '0-Estágio, 1-JR, 2-PL, 3-SR, 4-Analista, 5- Agente'
  })
  level: LevelType;

  @ApiProperty()
  gender: GenderTypes;

  @ApiProperty()
  ethnicity: EthnicityTypes;

  @ApiProperty()
  pcd: boolean;

  @ApiProperty()
  acceptsAllLevels: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
