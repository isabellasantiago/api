import { ApiProperty } from '@nestjs/swagger';

export class UpdateCandidateDTO {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  phone?: string;
}
