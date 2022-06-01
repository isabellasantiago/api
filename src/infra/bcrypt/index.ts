import { compareSync, hashSync, genSaltSync } from 'bcrypt';
import { bcryptInterface } from './interface/bcrypt.interface';

export class Bcrypt implements bcryptInterface {
  crypt(value: string): string {
    const salt = genSaltSync(12);
    return hashSync(value, salt);
  }

  compare(value: string, hash: string): boolean {
    return compareSync(value, hash);
  }
}
