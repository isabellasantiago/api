import { ApiProperty } from '@nestjs/swagger';

export class CandidateModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userID: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
