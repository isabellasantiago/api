import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CandidateEntity } from './candidate.entity';
import { HardSkillsByCandidate } from './hardSkillsByCandidate.entity';

@Table({ tableName: 'HardSkills' })
export class HardSkillsEntity extends Model<HardSkillsEntity> {
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
    defaultValue: DataType.NOW
  })
    createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  updatedAt: Date;

  @BelongsToMany(() => CandidateEntity, () => HardSkillsByCandidate)
  candidates: CandidateEntity[];
}
