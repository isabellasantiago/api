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
import { HardSkillsEntity } from './hardSkills.entity';

@Table({ tableName: 'HardSkillsByJobVacancies' })
export class HardSkillsByJobVacanciesEntity extends Model<HardSkillsByJobVacanciesEntity> {
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

  @ForeignKey(() => HardSkillsEntity)
  @Column
  hardSkillsID: number;

  @BelongsTo(() => HardSkillsEntity)
  hardSkills: HardSkillsEntity;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
