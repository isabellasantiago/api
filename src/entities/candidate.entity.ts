import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Model,
  Table,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { HardSkillsEntity } from './hardSkills.entity';
import { HardSkillsByCandidate } from './hardSkillsByCandidate.entity';
import { PreviousJobsEntity } from './previousJobs.entity';
import { SoftSkillsEntity } from './softSkills.entity';
import { SoftSkillsByCandidateEntity } from './softSkillsByCandidate.entity';
import { UserEntity } from './user.entity';

@Table({ tableName: 'Candidate', paranoid: true })
export class CandidateEntity extends Model<CandidateEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => UserEntity)
  @Column({
    type: DataType.BIGINT,
  })
  userID: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  cpf: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

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

  @Column({
    type: DataType.DATE,
  })
  deletedAt: Date;
  
  @BelongsToMany(() => SoftSkillsEntity, () => SoftSkillsByCandidateEntity)
  softSkills: SoftSkillsEntity[];

  @BelongsToMany(() => HardSkillsEntity, () => HardSkillsByCandidate)
  hardSkills: HardSkillsEntity[];

  @HasMany(() => PreviousJobsEntity)
  previousJobs: PreviousJobsEntity[];

}
