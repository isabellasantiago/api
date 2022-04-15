import { AutoIncrement, BelongsTo, Column, DataType, DeletedAt, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CandidateEntity } from "./candidate.entity";
import { SoftSkillsEntity } from "./softSkills.entity";

@Table({ tableName: 'SoftSkillsByCandidate' })
export class SoftSkillsByCandidateEntity extends Model<SoftSkillsByCandidateEntity>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT
    })
    id: number;

    @ForeignKey(() => CandidateEntity)
    @Column
    candidateID: number;

    @BelongsTo(() => CandidateEntity)
    candidate: CandidateEntity;

    @ForeignKey(() => SoftSkillsEntity)
    @Column
    softSkillID: number;

    @BelongsTo(() => SoftSkillsEntity)
    softSkill: SoftSkillsEntity

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