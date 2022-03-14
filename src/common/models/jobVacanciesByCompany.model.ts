import { ApiProperty } from '@nestjs/swagger';

export class JobVacanciesByCompanyModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  companyID: number;

  @ApiProperty()
  jobVacanciesID: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
