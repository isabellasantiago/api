import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from './user.entity';

@Table({ tableName: 'Candidate', paranoid: true })
export class CandidateEntity extends Model<CandidateEntity> {
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
  name: string;

  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  cpf: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

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
