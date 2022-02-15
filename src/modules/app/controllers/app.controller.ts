import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from '../service/app.service';

@Controller('')
export class AppController {
  constructor(@Inject(AppService) private readonly appService: AppService) {}

  @Get()
  getCurrentTime() {
    return `${this.appService.getCurrentTime()}`;
  }
}
