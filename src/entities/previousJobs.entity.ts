import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { LevelType } from "src/common/enums/levelType.enum";
import { CandidateEntity } from "./candidate.entity";

@Table({ tableName: 'PreviousJobs'})
export class PreviousJobsEntity extends Model<PreviousJobsEntity>{

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
    candidate: CandidateEntity

    @Column
    previousCompanyName: string;

    @Column
    role: string;

    @Column({type: DataType.ENUM({
        values: ['0-Estágio', '1-JR', '2-PL', '3-SR', '4-Analista', '5- Agente']
    })})
    level: LevelType;

    @Column
    fromDate: Date;

    @Column
    toDate: Date;

    @Column
    jobDescription: string;

    @Column({
        defaultValue: DataType.NOW,
    })
    createdAt: Date;
    
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    updatedAt: Date;
}