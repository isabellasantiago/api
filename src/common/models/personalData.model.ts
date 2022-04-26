import { ApiProperty } from '@nestjs/swagger';
import { ContractTypes } from '../enums/contractType.enum';
import { EthnicityTypes } from '../enums/ethnicityTypes.enum';
import { GenderTypesCv } from '../enums/genderTypesCv.enum';
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

  @ApiProperty({
    description: `'1 - Mulher', '2- Mulher Trans', '3 - Homem (cis)','4 - Homem Trans', '5 - OUTROS'`,
  })
  gender: GenderTypesCv;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  state: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({
    description: '1- Negra, 2- Indígena, 3- Amarela, 4- Branca',
  })
  ethnicity: EthnicityTypes;

  @ApiProperty()
  isPcd: boolean;

  @ApiProperty()
  allowsWhatsapp: boolean;

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
