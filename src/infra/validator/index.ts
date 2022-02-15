import { Injectable } from '@nestjs/common';
import {
  isNumber,
  isEmail,
  isCpf,
  isNumberString,
  isString,
} from 'node-simple-validator';

@Injectable()
export class Validator {
  isNumber(number: number): boolean {
    return isNumber(number);
  }
  isEmail(email: string): boolean {
    return isEmail(email);
  }
  isCpf(cpf: string): boolean {
    return isCpf(cpf);
  }
  isNumberString(value: string): boolean {
    return isNumberString(value);
  }
  isString(value: any): boolean {
    return isString(value);
  }

  isYearValid(year: number | string): boolean {
    const parsedYear = String(year);
    if (parsedYear.length !== 4) return false;
    return true;
  }

  isDayOrMonthValid(value: string | number): boolean {
    const parsedValue = String(value);
    if (parsedValue.length !== 2) return false;
    return true;
  }
}
