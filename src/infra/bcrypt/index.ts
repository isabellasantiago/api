import { compareSync, hashSync, genSaltSync } from 'bcrypt';
import { bcryptInterface } from './interface/bcrypt.interface';

export class Bcrypt implements bcryptInterface {
  crypt(value: string): string {
    const salt = genSaltSync(11);
    return hashSync(value, salt);
  }

  compare(value: string, hash: string): boolean {
    return compareSync(value, hash);
  }
}
