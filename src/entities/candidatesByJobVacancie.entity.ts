import {
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    PrimaryKey,
    Table,
    Model,
    HasMany,
  } from 'sequelize-typescript';
import { CandidateEntity } from './candidate.entity';
import { JobVacanciesEntity } from './jobVacancies.entity';

@Table({ tableName: 'CandidatesByJobVacancie' })
export class CandidatesByJobVacancieEntity extends Model<CandidatesByJobVacancieEntity> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
    })
    id: number;

    @ForeignKey(() => JobVacanciesEntity)
    @Column({
        type: DataType.BIGINT,
    })
    jobVacancieID: number;

    @BelongsTo(() => JobVacanciesEntity, 'jobVacancieID')
    jobVacancie: JobVacanciesEntity;

    @ForeignKey(() => CandidateEntity)
    @Column({
        type: DataType.BIGINT,
    })
    candidateID: number;

    @BelongsTo(() => CandidateEntity, 'candidateID')
    candidate: CandidateEntity;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isApplied: boolean;
    
    @Column({
        type: DataType.NUMBER,
        defaultValue: 0,
    })
    matchPercentage: number;

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
}