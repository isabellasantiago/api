import { ApiProperty } from '@nestjs/swagger';

export class BenefitsByJobVacanciesModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  jobVacanciesID: number;

  @ApiProperty()
  jobBenefitsID: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
