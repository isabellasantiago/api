import { ApiProperty } from '@nestjs/swagger';

export class HardSkillsByJobVacanciesModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  jobVacanciesID: number;

  @ApiProperty()
  hardSkillsID: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
