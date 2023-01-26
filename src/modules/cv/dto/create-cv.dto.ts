import { ApiProperty } from '@nestjs/swagger';
import { ContractTypes } from 'src/common/enums/contractType.enum';
import { LevelType } from 'src/common/enums/levelType.enum';
import { AcademicsInformationsModel } from 'src/common/models/academicsInformation.model';
import { LanguagesInformationModel } from 'src/common/models/languagesInformation.model';
import { PreviousJobsModel } from 'src/common/models/previousJobs.model';

export class CreateOrUpdateCvDTO {
  @ApiProperty()
  imageURL?: string;

  @ApiProperty()
  linkedinURL?: string;

  @ApiProperty()
  naturalness: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  state: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty({
    description: 'Área desejada',
  })
  field: string;

  @ApiProperty({
    description: '1- PJ, 2- CLT, 3-PJ OU CLT, 4- OUTROS',
  })
  contractType: ContractTypes;

  @ApiProperty({
    description: '1- Estágio, 2- JR, 3- PL, 4- SR, 5- Analista, 6 - Agente',
  })
  level: LevelType;

  @ApiProperty({
    description: 'Cargo desejavel',
  })
  role: string;

  @ApiProperty()
  academics?: AcademicsInformationsModel[];

  @ApiProperty()
  languages?: LanguagesInformationModel[];

  @ApiProperty()
  previousJobs?: PreviousJobsModel[];
}
