import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { JobRequirementsEntity } from './jobRequirements.entity';
import { JobVacanciesEntity } from './jobVacancies.entity';

@Table({ tableName: 'RequirementsByJobVacancies' })
export class RequirementsByJobVacanciesEntity extends Model<RequirementsByJobVacanciesEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => JobVacanciesEntity)
  @Column
  jobVacanciesID: number;

  @BelongsTo(() => JobVacanciesEntity)
  jobVacancies: JobVacanciesEntity;

  @ForeignKey(() => JobRequirementsEntity)
  @Column
  jobRequirementsID: number;

  @BelongsTo(() => JobRequirementsEntity)
  jobRequirements: JobRequirementsEntity;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
