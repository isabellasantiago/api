import { ApiProperty } from '@nestjs/swagger';

export class HardSkillsByCandidateModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  candidateID: number;

  @ApiProperty()
  hardSkillsID: number;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
