import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ContractTypes } from "src/common/enums/contractType.enum";
import { EthnicityTypes } from "src/common/enums/ethnicityTypes.enum";
import { GenderTypes } from "src/common/enums/genderTypes.enum";
import { LevelType } from "src/common/enums/levelType.enum";
import { CandidateEntity } from "./candidate.entity";

@Table({ tableName: 'Curriculum'})
export class PersonalDataEntity extends Model<PersonalDataEntity>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
    })
    id: number;

    @ForeignKey(() => CandidateEntity)
    @Column({
        type: DataType.BIGINT,
    })
    candidateID: number;

    @BelongsTo(() => CandidateEntity)
    candidate: CandidateEntity

    @Column
    imageURL: string;

    @Column
    linkedinURL: string;

    @Column
    naturalness: string;

    @Column({
        type: DataType.ENUM({
            values: ['0 - Mulher', '1- Mulher Trans', '2 - Pessoas Trans', '3- Mulher (cis) e Pessoas Trans']
        })
    })
    gender: GenderTypes;

    @Column({
        type: DataType.DATE
    })
    birthDate: Date;

    @Column
    state: string;

    @Column
    city: string;
    
    @Column
    phone: string;

    @Column({
        type: DataType.ENUM('0- Negra', '1- Indígena', '2-Amarela', '3-Branca')
    })
    ethnicity: EthnicityTypes;

    @Column
    isPcd: boolean;

    @Column
    allowsWhatsapp: boolean;

    @Column
    filed: string;

    @Column({
        type: DataType.ENUM({
            values: ['0 - PJ', '1-CLT', '2-PJ OU CLT', '3- OUTROS']
        })
    })
    contractType: ContractTypes

    @Column({type: DataType.ENUM({
        values: ['0-Estágio', '1-JR', '2-PL', '3-SR', '4-Analista', '5- Agente']
    })})
    level: LevelType

    @Column
    role: string;

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