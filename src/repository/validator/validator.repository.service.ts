import { Inject, Injectable } from '@nestjs/common';
import { Validator } from 'src/infra/validator';

@Injectable()
export class ValidatorRepositoryService {
  constructor(@Inject(Validator) private readonly validator) {}

  isEmail(email: string): boolean {
    return this.validator.isEmail(email);
  }
  isCpf(cpf: string): boolean {
    return this.validator.isCpf(cpf);
  }
  isNumber(number: number): boolean {
    return this.validator.isNumber(number);
  }
  isNumberString(value: string): boolean {
    return this.validator.isNumberString(value);
  }
  isString(value: string | number): boolean {
    return this.validator.isString(value);
  }
  isYearValid(year: string | number): boolean {
    return this.validator.isYearValid(year);
  }
  isDayOrMonthValid(value: string | number): boolean {
    return this.validator.isDayOrMonthValid(value);
  }
}
