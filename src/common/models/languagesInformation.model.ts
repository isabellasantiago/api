import { ApiProperty } from '@nestjs/swagger';
import { LanguageLevelType } from '../enums/languageLevel-type.enum';

export class LanguagesInformationModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  candidateID: number;

  @ApiProperty()
  languageName: string;

  @ApiProperty({
    description: '1- Básico, 2- Intermediário, 3- Avançado, 4- Fluente',
  })
  languageLevel: LanguageLevelType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
