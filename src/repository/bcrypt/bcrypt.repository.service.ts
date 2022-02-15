import { Inject } from '@nestjs/common';
import { Bcrypt } from 'src/infra/bcrypt';
import { bcryptInterface } from 'src/infra/bcrypt/interface/bcrypt.interface';

export class BcryptRepositoryService {
  constructor(@Inject(Bcrypt) private readonly bcrypt: bcryptInterface) {}

  compare(value: string, hash: string): boolean {
    return this.bcrypt.compare(value, hash);
  }

  crypt(value: string): string {
    return this.bcrypt.crypt(value);
  }
}
