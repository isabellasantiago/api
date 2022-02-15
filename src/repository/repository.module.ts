import { Module } from '@nestjs/common';
import { InfraModule } from 'src/infra/infra.module';
import { UserEntity } from 'src/entities/user.entity';
import MySQL from '../infra/database/mysql';
import { UserRepositoryService } from './services/user/user.repository.service';
import { ValidatorRepositoryService } from './validator/validator.repository.service';

@Module({
  imports: [MySQL.injectEntities([UserEntity]), InfraModule],
  providers: [UserRepositoryService, ValidatorRepositoryService],
  exports: [UserRepositoryService, ValidatorRepositoryService],
})
export class RepositoryModule {}
