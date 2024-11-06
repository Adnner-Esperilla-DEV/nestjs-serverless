import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserTypeOrmEntity } from '../database/user.typeorm-entity';
import { UserService } from './user.service';
import {
  UserCreateUseCase,
  UserGetAllUseCase,
  UserGetOneByIdUseCase,
  UserUpdateUseCase,
  UserDeleteUseCase,
} from '../../application/user.usecase';
@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserService,
    },
    UserGetAllUseCase,
    UserGetOneByIdUseCase,
    UserCreateUseCase,
    UserUpdateUseCase,
    UserDeleteUseCase,
  ],
})
export class UserModule {}
