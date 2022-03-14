import { ApiProperty } from '@nestjs/swagger';

export class RequirementsByJobVacanciesModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  jobVacanciesID: number;

  @ApiProperty()
  jobRequirementsID: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
