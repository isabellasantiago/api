import { Logger } from '@nestjs/common';
import config from './config/app';
import envs from './config/envs';

const bootstrap = async (): Promise<void> => {
  const logger = new Logger('Bootstrap');
  const app = await config();
  await app.listen(3333);

  logger.log(
    `New Way API has been started on port http://localhost:${envs.port}`,
  );
};

export default bootstrap;
