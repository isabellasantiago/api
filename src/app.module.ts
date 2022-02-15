import { Module } from '@nestjs/common';
import MySQL from './infra/database/mysql';
import { AppController } from './modules/app/controllers/app.controller';
import { AppService } from './modules/app/service/app.service';

@Module({
  imports: [MySQL.connect(), AppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
