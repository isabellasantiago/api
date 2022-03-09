import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { RequirementsByJobVacanciesEntity } from './requirementsByJobVacancies.entity';

@Table({ tableName: 'JobRequirements' })
export class JobRequirementsEntity extends Model<JobRequirementsEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @HasOne(() => RequirementsByJobVacanciesEntity)
  requirementsByJobVacancies: RequirementsByJobVacanciesEntity;

  @HasMany(() => RequirementsByJobVacanciesEntity)
  jobVacancies: RequirementsByJobVacanciesEntity[];
}
