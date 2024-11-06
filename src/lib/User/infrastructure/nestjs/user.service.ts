// src/infrastructure/repositories/user-repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../domain/user-repository.interface';
import { UserTypeOrmEntity } from '../database/user.typeorm-entity';
import { User } from '../../domain/user.entity';

@Injectable()
export class UserService implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userRepository: Repository<UserTypeOrmEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const entity = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(entity);
    return new User(savedUser.id, savedUser.name, savedUser.email);
  }

  async getAll(): Promise<User[]> {
    const entities = await this.userRepository.find();
    return entities.map(
      (entity) => new User(entity.id, entity.name, entity.email),
    );
  }

  async getOneById(id: number): Promise<User | null> {
    const entity = await this.userRepository.findOne({ where: { id } });
    if (!entity) return null;
    return new User(entity.id, entity.name, entity.email);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    return updatedUser
      ? new User(updatedUser.id, updatedUser.name, updatedUser.email)
      : null;
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
