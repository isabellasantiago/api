import { Logger } from '@nestjs/common';
import { BulkCreateOptions, Model } from 'sequelize';
import { CreateOptions } from 'sequelize';
import { FindOptions, OperatorsAliases } from 'sequelize';
import { Op } from 'sequelize';
import envs from 'src/config/envs';
import MySQLCredentials from '../config/credentials';
import {
  MySQLHooks,
  MySQLLoggingOptions,
  MySQLOptions,
} from '../config/options';

const LoggerFactory: MySQLLoggingOptions = (sql: string) =>
  new Logger('Sequelize', { timestamp: true }).debug(sql);

const Operators = Op;
const operatrosAliases: OperatorsAliases = {
  $eq: Operators.eq,
  $ne: Operators.ne,
  $gte: Operators.gte,
  $gt: Operators.gt,
  $lte: Operators.lte,
  $lt: Operators.lt,
  $not: Operators.not,
  $in: Operators.in,
  $notIn: Operators.notIn,
  $is: Operators.is,
  $like: Operators.like,
  $notLike: Operators.notLike,
  $iLike: Operators.iLike,
  $notILike: Operators.notILike,
  $regexp: Operators.regexp,
  $notRegexp: Operators.notRegexp,
  $iRegexp: Operators.iRegexp,
  $notIRegexp: Operators.notIRegexp,
  $between: Operators.between,
  $notBetween: Operators.notBetween,
  $overlap: Operators.overlap,
  $contains: Operators.contains,
  $contained: Operators.contained,
  $adjacent: Operators.adjacent,
  $strictLeft: Operators.strictLeft,
  $strictRight: Operators.strictRight,
  $noExtendRight: Operators.noExtendRight,
  $noExtendLeft: Operators.noExtendLeft,
  $and: Operators.and,
  $or: Operators.or,
  $any: Operators.any,
  $all: Operators.all,
  $values: Operators.values,
  $col: Operators.col,
};

const hooksFactory: MySQLHooks = {
  beforeFind(options: FindOptions) {
    options.raw = false;
    options.nest = false;
    Promise.resolve();
  },

  beforeCreate(attributes: Model<any, any>, options: CreateOptions) {
    options.raw = false;
    Promise.resolve();
  },

  beforeBulkCreate(instance: Model<any, any>[], options: BulkCreateOptions) {
    options.hooks = true;
    options.individualHooks = true;
    Promise.resolve();
  },
};

class SequelizeOptions implements MySQLOptions {
  readonly dialect = 'mysql';
  readonly host = MySQLCredentials.HOST;
  readonly port = MySQLCredentials.PORT;
  readonly username = MySQLCredentials.USER;
  readonly database = MySQLCredentials.DATABASE;
  readonly password = MySQLCredentials.PASSWORD;
  readonly logging = envs.nodeEnv !== 'production' ? LoggerFactory : false;
  readonly operatorsAliases = operatrosAliases;
  readonly synchronize = false;
  readonly sync = { alter: false, force: false, logging: LoggerFactory };
  readonly ssl = envs.nodeEnv === 'production';
  readonly autoLoadModels = true;
  readonly hooks = hooksFactory;
}

export default new SequelizeOptions();
