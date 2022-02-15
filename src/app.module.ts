import { Module } from '@nestjs/common';
import MySQL from './infra/database/mysql';
import { AppController } from './modules/app/controllers/app.controller';
import { AppService } from './modules/app/service/app.service';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [MySQL.connect(), AppModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
