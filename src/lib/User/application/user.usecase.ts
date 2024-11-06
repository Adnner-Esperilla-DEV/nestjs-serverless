import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user-repository.interface';
import { User } from '../domain/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundException } from '../domain/user-not-found.exception';
@Injectable()
export class UserCreateUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(create: CreateUserDto): Promise<User> {
    const user = new User(null, create.name, create.email);
    return await this.userRepository.create(user);
  }
}
export class UserGetAllUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute() {
    return await this.userRepository.getAll();
  }
}
export class UserGetOneByIdUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number) {
    const user = await this.userRepository.getOneById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
export class UserUpdateUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number, update: UpdateUserDto) {
    const user = await this.userRepository.getOneById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    user.name = update.name;
    user.email = update.email;
    return await this.userRepository.update(id, user);
  }
}
export class UserDeleteUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number) {
    const user = await this.userRepository.getOneById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    await this.userRepository.delete(id);
  }
}
