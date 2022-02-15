import { DynamicModule } from '@nestjs/common';
import { MySQLConnection } from './config/connection';
import { InjectEntities } from './config/injectEntities';
import { MySQLOptions } from './config/options';
import SequelizeOptions from './sequelize/options';
import SequelizeConnection from './sequelize/connection';
import SequelizeInjectEntities from './sequelize/injectEntities';

interface MYSQLInterface {
  readonly options: MySQLOptions;
  connect: MySQLConnection<DynamicModule>;
  injectEntities: InjectEntities<DynamicModule>;
}

class MySQL implements MYSQLInterface {
  readonly options: MySQLOptions = {
    autoLoadModels: SequelizeOptions.autoLoadModels,
    database: SequelizeOptions.database,
    dialect: SequelizeOptions.dialect,
    hooks: SequelizeOptions.hooks,
    host: SequelizeOptions.host,
    logging: SequelizeOptions.logging,
    operatorsAliases: SequelizeOptions.operatorsAliases,
    password: SequelizeOptions.password,
    port: SequelizeOptions.port,
    ssl: SequelizeOptions.ssl,
    sync: SequelizeOptions.sync,
    synchronize: SequelizeOptions.synchronize,
    username: SequelizeOptions.username,
  };

  private connection: DynamicModule = null;
  private static instance: MySQL;

  constructor() {
    this.connection = SequelizeConnection(this.options);
  }

  connect(): DynamicModule {
    if (!this.connection) {
      this.connection = SequelizeConnection(this.options);
      return this.connection;
    }
    return this.connection;
  }

  injectEntities(entities: any[]): DynamicModule {
    return SequelizeInjectEntities(entities);
  }

  static getInstance() {
    return this.instance || (this.instance = new this());
  }
}

export default MySQL.getInstance();
