import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ContractTypes } from 'src/common/enums/contractType.enum';
import { LevelType } from 'src/common/enums/levelType.enum';
import { CandidateEntity } from './candidate.entity';

@Table({ tableName: 'PersonalDatas' })
export class PersonalDataEntity extends Model<PersonalDataEntity> {
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
  candidate: CandidateEntity;

  @Column
  imageURL: string;

  @Column
  linkedinURL: string;

  @Column
  naturalness: string;

  @Column({
    type: DataType.DATE,
  })
  birthDate: Date;

  @Column
  state: string;

  @Column
  city: string;

  @Column
  phone: string;

  @Column
  isPcd: boolean;

  @Column
  allowsWhatsapp: boolean;

  @Column
  field: string;

  @Column({
    type: DataType.ENUM({
      values: ['1 - PJ', '2-CLT', '3-PJ OU CLT', '4- OUTROS'],
    }),
  })
  contractType: ContractTypes;

  @Column({
    type: DataType.ENUM({
      values: ['1-Estágio', '2-JR', '3-PL', '4-SR', '5-Analista', '6- Agente'],
    }),
  })
  level: LevelType;

  @Column
  role: string;

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
