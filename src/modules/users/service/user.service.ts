import {
  BadRequestException,
  ConflictException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { UserModel } from 'src/common/models/user.model';
import { BcryptRepositoryService } from 'src/repository/bcrypt/bcrypt.repository.service';
import { UserRepositoryService } from 'src/repository/services/user/user.repository.service';
import { ValidatorRepositoryService } from 'src/repository/validator/validator.repository.service';
import { CreateUserDto } from '../dto/create-user.dto';

export class UserService {
  constructor(
    @Inject(UserRepositoryService)
    private readonly userRepository: UserRepositoryService,
    @Inject(ValidatorRepositoryService)
    private readonly validatorRepositoryService: ValidatorRepositoryService,
    @Inject(BcryptRepositoryService)
    private readonly bcryptRepository: BcryptRepositoryService,
  ) {}

  async createUser(user: CreateUserDto): Promise<Omit<UserModel, 'password'>> {
    const userExists = await this.userRepository.getUserByEmail(user.email);

    if (userExists) throw new ConflictException('User already exists');

    const isEmailValid = this.validatorRepositoryService.isEmail(user.email);
    if (!isEmailValid) throw new BadRequestException('Email invalid');

    const isTypeNumber = this.validatorRepositoryService.isNumber(user.type);
    if (!isTypeNumber) throw new BadRequestException('Type is invalid');

    const cryptedPassword = this.bcryptRepository.crypt(user.password);

    const userCreated = await this.userRepository.createUser({
      ...user,
      password: cryptedPassword,
    });

    return userCreated;
  }

  async loadAllUsers(): Promise<UserModel[]> {
    return await this.userRepository.loadAllUsers();
  }

  async getUserByID(id: number): Promise<UserModel> {
    const user = await this.userRepository.getUserByID(id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async inactiveOrActiveUser(id: number): Promise<boolean> {
    const user = await this.userRepository.getUserByID(id);
    if (!user) throw new NotFoundException('User not found');
    return await this.userRepository.inactiveOrActiveUser({ id });
  }
}
