import { UserType } from "src/common/enums/user-type.enum";

export class CreateUserDto {
  email: string;
  password: string;
  type: UserType;
}
