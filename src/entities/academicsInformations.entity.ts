import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { AcademicFormationTypes } from "src/common/enums/academicFormation-type.enum";
import { AcademicStatusType } from "src/common/enums/academicStatus-type.enum";
import { CandidateEntity } from "./candidate.entity";

@Table({
    tableName: 'AcademicsInformations'
})
export class AcademicsInformationsEntity extends Model<AcademicsInformationsEntity>{

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
    candidate: number;

    @Column
    institutionName: string;

    @Column
    courseName: string;

    @Column({
        type: DataType.ENUM({
            values: ['0- Ensino médio/regular', '1- Técnologo','2- Ensino Superior', '3- Pós graduação', '4- Mestrado', '5- Doutorado']
        })
    })
    academicFormation: AcademicFormationTypes;

    @Column({
        type: DataType.ENUM({
            values:['0- Cursando', '2- Concluido', '3 - Trancado']
        })
    })
    academicFormationStatus: AcademicStatusType

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