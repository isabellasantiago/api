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

  @ApiProperty({
    description:
      '1- Mulher, 2- Mulher Trans, 3- Pessoas Trans, 4- Mulher Cis e Pessoas Trans',
  })
  gender: GenderTypes;

  @ApiProperty({
    description: '1 - Negra, 2 - Indígena, 3- Amarela, 4 - Branca',
  })
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
