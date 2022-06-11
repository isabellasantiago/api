import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../enums/user-type.enum';

export class UserModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  type: UserType;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  deletedAt?: Date;
}
