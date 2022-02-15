import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Bcrypt } from './bcrypt';
import { Validator } from './validator';

@Module({
  imports: [HttpModule],
  providers: [Validator, Bcrypt],
  exports: [Validator, Bcrypt],
})
export class InfraModule {}
