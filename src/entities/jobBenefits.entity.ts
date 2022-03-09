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
import { BenefitsByJobVacanciesEntity } from './benefitsByJobVacancies.entity';

@Table({ tableName: 'JobBenefits' })
export class JobBenefitsEntity extends Model<JobBenefitsEntity> {
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

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @HasOne(() => BenefitsByJobVacanciesEntity)
  benefitsByJobVacancies: BenefitsByJobVacanciesEntity;

  @HasMany(() => BenefitsByJobVacanciesEntity)
  jobVacancies: BenefitsByJobVacanciesEntity[];
}
