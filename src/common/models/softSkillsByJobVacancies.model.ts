import { ApiProperty } from '@nestjs/swagger';

export class SoftSkillsByJobVacanciesModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  jobVacanciesID: number;

  @ApiProperty()
  sofSkillsID: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
