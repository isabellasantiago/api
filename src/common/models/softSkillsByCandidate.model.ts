import { ApiProperty } from '@nestjs/swagger';

export class SoftSkillsByCandidateModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  candidateID: number;

  @ApiProperty()
  softSkillsID: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
