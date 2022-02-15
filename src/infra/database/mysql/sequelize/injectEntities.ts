import { SequelizeModule } from '@nestjs/sequelize';

const SequelizeInjectEntities = (entities: any[]) =>
  SequelizeModule.forFeature(entities);

export default SequelizeInjectEntities;
