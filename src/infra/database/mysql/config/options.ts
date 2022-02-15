export type MySQLLoggingOptions = false | ((param?: string) => void);

export type MySQLSyncOption = {
  alter: boolean;
  force: boolean;
  logging: MySQLLoggingOptions;
};

export type MySQLHooks = {
  beforeFind: (options: any) => void;
  beforeCreate: (attributes: any, options: any) => void;
  beforeBulkCreate: (attributes: any, options?: any) => void;
};

export type MySQLOptions = {
  dialect: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging?: MySQLLoggingOptions;
  operatorsAliases?: any;
  synchronize?: boolean;
  sync?: MySQLSyncOption;
  ssl: boolean;
  autoLoadModels: boolean;
  hooks: MySQLHooks;
};
