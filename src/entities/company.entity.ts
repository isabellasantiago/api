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
import { CompanyTypes } from 'src/common/enums/company-type.eum';
import { UserEntity } from '.';

@Table({ tableName: 'Companies', paranoid: true })
export class CompanyEntity extends Model<CompanyEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => UserEntity)
  @Column({
    type: DataType.BIGINT,
  })
  userID: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;

  @Column({
    type: DataType.STRING,
  })
  cnpj: string;

  @Column({
    type: DataType.STRING,
  })
  tradeName: string;

  @Column({
    type: DataType.STRING,
  })
  corporateName: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  imageURL: string;

  @Column({
    type: DataType.STRING,
  })
  linkedinURL: string;

  @Column({
    type: DataType.STRING,
  })
  aboutCompany: string;

  @Column({
    type: DataType.STRING,
  })
  type: CompanyTypes;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @Column({
    type: DataType.DATE,
  })
  deletedAt: Date;
}
