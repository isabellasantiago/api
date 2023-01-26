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
} from 'sequelize-typescript';
import { AcademicsInformationsEntity } from './academicsInformations.entity';
import { CandidatesByJobVacancieEntity } from './candidatesByJobVacancie.entity';
import { LanguagesInformationEntity } from './languagesInformation.entity';
import { PreviousJobsEntity } from './previousJobs.entity';
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
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @Column({
    type: DataType.DATE,
  })
  deletedAt: Date;

  @HasMany(() => PreviousJobsEntity)
  previousJobs: PreviousJobsEntity[];

  @HasMany(() => LanguagesInformationEntity)
  languangesInformations: LanguagesInformationEntity[];

  @HasMany(() => AcademicsInformationsEntity)
  academicsInformations: AcademicsInformationsEntity[];

  @HasMany(() => CandidatesByJobVacancieEntity, 'candidateID')
  CandidatesByJobVacancie: CandidatesByJobVacancieEntity[];
}
