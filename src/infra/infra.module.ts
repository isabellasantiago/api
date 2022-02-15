import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Validator } from './validator';

@Module({
  imports: [HttpModule],
  providers: [Validator],
  exports: [Validator],
})
export class InfraModule {}
