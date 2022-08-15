import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ContractTypes } from 'src/common/enums/contractType.enum';
import { LevelType } from 'src/common/enums/levelType.enum';
import { CompanyEntity } from './company.entity';
@Table({ tableName: 'JobVacancies' })
export class JobVacanciesEntity extends Model<JobVacanciesEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => CompanyEntity)
  @Column
  companyID: number;

  @BelongsTo(() => CompanyEntity)
  company: CompanyEntity;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.NUMBER,
  })
  salary: number;

  @Column({
    type: DataType.ENUM({
      values: ['1 - PJ', '2 - CLT', '3 - PJ ou CLT', '4 - OUTROS'],
    }),
  })
  contractType: ContractTypes;

  @Column({
    type: DataType.STRING,
  })
  about: string;

  @Column({
    type: DataType.STRING,
  })
  cityAndState: string;

  @Column({
    type: DataType.ENUM({
      values: ['1-Estágio', '2-JR', '3-PL', '4-SR', '5-Analista', '6- Agente'],
    }),
  })
  level: LevelType;

  @Column({
    type: DataType.BOOLEAN,
  })
  pcd: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  acceptsAllLevels: boolean;

  @Column
  paused: boolean;

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
