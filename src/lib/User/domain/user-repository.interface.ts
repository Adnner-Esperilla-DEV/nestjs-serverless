import { User } from './user.entity';

export interface UserRepository {
  create(user: User): Promise<User>;
  getAll(): Promise<User[]>;
  getOneById(id: number): Promise<User | null>;
  update(id: number, user: Partial<User>): Promise<User | null>;
  delete(id: number): Promise<void>;
}
