import { HttpException, HttpStatus } from '@nestjs/common';
import envs from 'src/config/envs';

interface DatabaseCredentialsInterface {
  HOST: string;
  PASSWORD: string;
  DATABASE: string;
  USER: string;
  PORT?: number;
  TYPE: string;
  URI: string;
}

interface MySQLCredentialsInterface {
  readonly host: typeof envs.mysql.host;
  readonly database: typeof envs.mysql.database;
  readonly port: typeof envs.mysql.port;
  readonly user: typeof envs.mysql.user;
  readonly password: typeof envs.mysql.password;

  readonly credentials: {
    local: DatabaseCredentialsInterface;
  };
}

class FactoryMySQLCredentials implements MySQLCredentialsInterface {
  readonly host = envs.mysql.host;
  readonly database = envs.mysql.database;
  readonly port = envs.mysql.port;
  readonly user = envs.mysql.user;
  readonly password = envs.mysql.password;

  readonly credentials = {
    local: {
      HOST: this.host,
      PASSWORD: this.password,
      DATABASE: this.database,
      USER: this.user,
      PORT: parseInt(this.port || '3306'),
      TYPE: 'mysql',
      URI: `mysql://${this.user}:${this.password}@${this.host}:${parseInt(
        this.port || '3306',
      )}/${this.database}`,
    },
  };

  constructor(readonly _environment: string) {}

  getCredentials(): DatabaseCredentialsInterface {
    if (!this.credentials[this._environment])
      throw new HttpException(
        `NODE_ENV ${this._environment} not found`,
        HttpStatus.FORBIDDEN,
      );

    if (Object.values(this.credentials[this._environment]).includes(undefined))
      throw new HttpException(
        'MYSQL credentials has a value UNDEFINED',
        HttpStatus.FORBIDDEN,
      );

    if (Object.values(this.credentials[this._environment]).includes(null))
      throw new HttpException(
        'MYSQL credentials has a value NULL',
        HttpStatus.FORBIDDEN,
      );

    return this.credentials[this._environment];
  }
}

const MySQLCredentials = new FactoryMySQLCredentials(
  envs.nodeEnv,
).getCredentials();

export default MySQLCredentials;
