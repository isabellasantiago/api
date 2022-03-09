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
import { CompanyEntity } from '.';
import { JobVacanciesEntity } from './jobVacancies.entity';

@Table({ tableName: 'JobVancanciesByCompanies' })
export class JobVacanciesByCompanyEntity extends Model<JobVacanciesByCompanyEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => CompanyEntity)
  @Column({
    type: DataType.BIGINT,
  })
  companyID: number;

  @BelongsTo(() => CompanyEntity)
  company: CompanyEntity;

  @ForeignKey(() => JobVacanciesEntity)
  @Column({
    type: DataType.BIGINT,
  })
  jobVacanciesID: number;

  @BelongsTo(() => JobVacanciesEntity)
  jobVacancies: JobVacanciesEntity;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
