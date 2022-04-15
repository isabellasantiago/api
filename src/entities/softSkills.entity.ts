import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CandidateEntity } from './candidate.entity';
import { SoftSkillsByCandidateEntity } from './softSkillsByCandidate.entity';

@Table({ tableName: 'SoftSkills' })
export class SoftSkillsEntity extends Model<SoftSkillsEntity> {
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
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @HasOne(() => SoftSkillsByCandidateEntity)
  softSkillsByCandidate: SoftSkillsByCandidateEntity;

  @BelongsToMany(() => CandidateEntity, () => SoftSkillsByCandidateEntity)
  candidate: CandidateEntity[];
}
