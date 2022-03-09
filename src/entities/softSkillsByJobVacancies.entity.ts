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
  sofSkillsID: number;

  @BelongsTo(() => SoftSkillsEntity)
  softSkills: SoftSkillsEntity;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
