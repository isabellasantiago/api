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
import { AcademicFormationTypes } from 'src/common/enums/academicFormation-type.enum';
import { AcademicStatusType } from 'src/common/enums/academicStatus-type.enum';
import { CandidateEntity } from './candidate.entity';

@Table({
  tableName: 'AcademicInformations',
})
export class AcademicsInformationsEntity extends Model<AcademicsInformationsEntity> {
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
  instituitionName: string;

  @Column
  courseName: string;

  @Column({
    type: DataType.ENUM({
      values: [
        '1- Ensino médio/regular',
        '2- Técnologo',
        '3- Ensino Superior',
        '4- Pós graduação',
        '5- Mestrado',
        '6- Doutorado',
      ],
    }),
  })
  academicFormation: AcademicFormationTypes;

  @Column({
    type: DataType.ENUM({
      values: ['1- Cursando', '2- Concluido', '3 - Trancado'],
    }),
  })
  academicFormationStatus: AcademicStatusType;

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
