import { ApiProperty } from '@nestjs/swagger';
import { LevelType } from '../enums/levelType.enum';

export class PreviousJobsModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  candidateID: number;

  @ApiProperty()
  previousCompanyName: string;

  @ApiProperty()
  role: string;

  @ApiProperty({
    description: `'1-Estágio', '2-JR', '3-PL', '4-SR', '5-Analista', '6- Agente'`,
  })
  level: LevelType;

  @ApiProperty({
    description: 'Data de inicio',
  })
  fromDate: Date;

  @ApiProperty({
    description: 'Data de termino',
  })
  toDate: Date;

  @ApiProperty()
  jobDescription: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
