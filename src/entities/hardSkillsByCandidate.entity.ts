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
import { CandidateEntity } from './candidate.entity';
import { HardSkillsEntity } from './hardSkills.entity';

@Table({ tableName: 'HardSkillsByCandidate' })
export class HardSkillsByCandidateEntity extends Model<HardSkillsByCandidateEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => CandidateEntity)
  @Column
  candidateID: number;

  @BelongsTo(() => CandidateEntity)
  candidate: CandidateEntity;

  @ForeignKey(() => HardSkillsEntity)
  @Column
  hardSkillsID: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @BelongsTo(() => HardSkillsEntity)
  hardSkill: HardSkillsEntity;
}
