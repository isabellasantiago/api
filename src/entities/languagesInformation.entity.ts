import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { LanguageLevelType } from "src/common/enums/languageLevel-type.enum";
import { CandidateEntity } from "./candidate.entity";

@Table({ tableName: 'LanguagesInformation'})
export class LanguagesInformationEntity extends Model<LanguagesInformationEntity> {
    
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

    @Column
    languageName: string;

    @Column({
        type: DataType.ENUM({
            values: ['0- Básico', '1- Intermediário', '2- Avançado', '3- Fluente']
        })
    })
    languageLevel: LanguageLevelType

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