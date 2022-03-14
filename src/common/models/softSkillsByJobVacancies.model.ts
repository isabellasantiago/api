import { ApiProperty } from '@nestjs/swagger';

export class SoftSkillsByJobVacanciesModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  jobVacanciesID: number;

  @ApiProperty()
  softSkillsID: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
