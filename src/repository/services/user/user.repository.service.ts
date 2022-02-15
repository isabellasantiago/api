import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/common/models/user.model';
import { UserEntity } from 'src/entities/user.entity';

export class UserRepositoryService {
  constructor(
    @InjectModel(UserEntity) private readonly userEntity: typeof UserEntity,
  ) {}

  async createUser(
    user: Pick<UserModel, 'email' | 'password' | 'type'>,
  ): Promise<UserModel> {
    const userCreated = this.userEntity.create({ ...user });

    return userCreated;
  }

  async loadAllUsers(): Promise<UserModel[]> {
    return await this.userEntity.findAll();
  }

  async getUserByID(userID: number): Promise<UserModel> {
    return await this.userEntity.findByPk(userID);
  }

  async getUserByEmail(email: string): Promise<UserModel> {
    return await this.userEntity.findOne({ where: { email } });
  }

  async inactiveOrActiveUser({ id }: Pick<UserModel, 'id'>): Promise<boolean> {
    const user = await this.userEntity.findOne({ where: { id } });

    if (!user) return false;

    if (user.active) {
      user.active = false;
      await user.save();
      return true;
    }

    if (!user.active) {
      user.active = true;
      await user.save();
      return true;
    }

    return false;
  }
}
