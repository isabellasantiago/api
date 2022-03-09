import { ApiProperty } from '@nestjs/swagger';
import { ContractTypes } from '../enums/contractType.enum';
import { EthnicityTypes } from '../enums/ethnicityTypes.enum';
import { GenderTypes } from '../enums/genderTypes.enum';
import { LevelType } from '../enums/levelType.enum';

export class JobVacanciesModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  salary: number;

  @ApiProperty()
  contractType: ContractTypes;

  @ApiProperty()
  cityAndState: string;

  @ApiProperty()
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
