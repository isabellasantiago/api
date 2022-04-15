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
import { JobVacanciesEntity } from './jobVacancies.entity';
import { SoftSkillsEntity } from './softSkills.entity';

@Table({ tableName: 'SoftSkillsByJobVacancies' })
export class SoftSkillsByJobVacanciesEntity extends Model<SoftSkillsByJobVacanciesEntity> {
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

  @ForeignKey(() => SoftSkillsEntity)
  @Column
  softSkillsID: number;

  @BelongsTo(() => SoftSkillsEntity)
  softSkills: SoftSkillsEntity;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
    createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  updatedAt: Date;
}
