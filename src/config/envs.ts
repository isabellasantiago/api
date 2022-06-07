type Mysql = {
  database: string;
  host: string;
  port: string;
  user: string;
  password: string;
};

type Envs = {
  nodeEnv: string;
  port: string;
  mysql: Mysql;
  jwtSecret: string;
};

const envs: Envs = {
  nodeEnv: process.env.NODE_ENV || 'local',
  port: process.env.NODE_PORT,
  mysql: {
    database: process.env.MYSQL_DATABASE || 'aa',
    host: process.env.MYSQL_HOST || 'aa',
    port: process.env.MYSQL_PORT || 'aa',
    user: process.env.MYSQL_USER || 'aa',
    password: process.env.MYSQL_PASSWORD || 'aa',
  },
  jwtSecret: process.env.SECRET || 'aa',
};

export default envs;
