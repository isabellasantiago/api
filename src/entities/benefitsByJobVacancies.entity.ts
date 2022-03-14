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
import { JobBenefitsEntity } from './jobBenefits.entity';
import { JobVacanciesEntity } from './jobVacancies.entity';

@Table({ tableName: 'BenefitsByJobVacancies' })
export class BenefitsByJobVacanciesEntity extends Model<BenefitsByJobVacanciesEntity> {
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

  @ForeignKey(() => JobBenefitsEntity)
  jobBenefitsID: number;

  @BelongsTo(() => JobBenefitsEntity)
  jobBenefits: JobBenefitsEntity;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
