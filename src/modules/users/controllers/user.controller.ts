import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserModel } from 'src/common/models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../service/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post('/')
  async createUser(
    @Body(new ValidationPipe({ transform: true })) user: CreateUserDto,
  ): Promise<Omit<UserModel, 'password'>> {
    return await this.userService.createUser(user);
  }

  @Get('/')
  async loadAllUsers(): Promise<UserModel[]> {
    return await this.userService.loadAllUsers();
  }

  @Get('/:id')
  async getUserByID(
    @Param(new ValidationPipe({ transform: true })) param: { id: number },
  ): Promise<UserModel> {
    return this.userService.getUserByID(param.id);
  }

  @Get('/')
  async getUserByEmail(
    @Body(new ValidationPipe({ transform: true })) email: string,
  ): Promise<UserModel> {
    return this.userService.getUserByEmail(email);
  }

  @Put('/inactive-active/:id')
  async inactiveOrActive(
    @Param(new ValidationPipe({ transform: true })) param: { id: number },
  ): Promise<boolean> {
    return await this.userService.inactiveOrActiveUser(param.id);
  }
}
