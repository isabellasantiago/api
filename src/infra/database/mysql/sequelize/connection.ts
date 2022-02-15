import { SequelizeModule } from '@nestjs/sequelize';
import SequelizeOptions from './options';
import { MySQLOptions } from '../config/options';

const SequelizeConnection = (options: MySQLOptions) =>
  SequelizeModule.forRoot(options as typeof SequelizeOptions);

export default SequelizeConnection;
