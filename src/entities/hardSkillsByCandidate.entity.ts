import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CandidateEntity } from "./candidate.entity";
import { HardSkillsEntity } from "./hardSkills.entity";

@Table({ tableName: 'HardSkillsByCandidate'})
export class HardSkillsByCandidate extends Model<HardSkillsByCandidate>{
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
    hardSkillID: number;

    @BelongsTo(() => HardSkillsEntity)
    hardSkill: HardSkillsEntity;
}