import {
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  DataType,
  DeletedAt,
  Model,
} from 'sequelize-typescript';
import { UserType } from 'src/common/enums/user-type.enum';

@Table({ tableName: 'Users', paranoid: true })
export class UserEntity extends Model<UserEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.NUMBER,
  })
  type: UserType;

  @Column({
    type: DataType.BOOLEAN,
  })
  active: boolean;

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

  @Column({
    type: DataType.DATE,
  })
  @DeletedAt
  deletedAt: Date;
}
