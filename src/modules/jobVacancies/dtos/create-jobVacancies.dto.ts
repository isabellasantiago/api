import { ApiProperty } from '@nestjs/swagger';
import { ContractTypes } from 'src/common/enums/contractType.enum';
import { LevelType } from 'src/common/enums/levelType.enum';

export class CreateJobVacanciesDTO {
  @ApiProperty()
  companyID: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  salary: number;

  @ApiProperty({
    description: '1- PJ, 2- CLT, 3-PJ OU CLT, 4- OUTROS',
  })
  contractType: ContractTypes;

  @ApiProperty()
  cityAndState: string;

  @ApiProperty()
  about: string;

  @ApiProperty({
    description:
      '1 = Estágio, 2 = JR, 3 = PL, 4 = SR, 5 = Analista, 6 = Agente',
  })
  level: LevelType;
}
