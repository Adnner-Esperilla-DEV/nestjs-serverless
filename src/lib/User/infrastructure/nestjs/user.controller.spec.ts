import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserCreateUseCase } from '../../application/user.usecase';
import { UserUpdateUseCase } from '../../application/user.usecase';
import { UserGetAllUseCase } from '../../application/user.usecase';
import { UserGetOneByIdUseCase } from '../../application/user.usecase';
import { UserDeleteUseCase } from '../../application/user.usecase';

describe('UserController', () => {
  let userController: UserController;
  const mockUserCreateUseCase = { execute: jest.fn() };
  const mockUserUpdateUseCase = { execute: jest.fn() };
  const mockUserGetAllUseCase = { execute: jest.fn() };
  const mockUserGetOneByIdUseCase = { execute: jest.fn() };
  const mockUserDeleteUseCase = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserCreateUseCase,
          useValue: mockUserCreateUseCase,
        },
        {
          provide: UserUpdateUseCase,
          useValue: mockUserUpdateUseCase,
        },
        {
          provide: UserGetAllUseCase,
          useValue: mockUserGetAllUseCase,
        },
        {
          provide: UserGetOneByIdUseCase,
          useValue: mockUserGetOneByIdUseCase,
        },
        {
          provide: UserDeleteUseCase,
          useValue: mockUserDeleteUseCase,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('should call UserCreateUseCase', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      mockUserCreateUseCase.execute.mockResolvedValue(userData);

      const result = await userController.create(userData);
      expect(result).toEqual(userData);
      expect(mockUserCreateUseCase.execute).toHaveBeenCalledWith(userData);
    });
  });

  describe('getAll', () => {
    it('should call UserGetAllUseCase', async () => {
      const users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
      mockUserGetAllUseCase.execute.mockResolvedValue(users);

      const result = await userController.findAll();
      expect(result).toEqual(users);
      expect(mockUserGetAllUseCase.execute).toHaveBeenCalled();
    });
  });
  describe('getOneById', () => {
    it('should return user data when found', async () => {
      const userId = 1;
      const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
      mockUserGetOneByIdUseCase.execute.mockResolvedValue(user);

      const result = await userController.findOne(userId);
      expect(result).toEqual(user);
      expect(mockUserGetOneByIdUseCase.execute).toHaveBeenCalledWith(userId);
    });

    it('should return null when user not found', async () => {
      const userId = 999;
      mockUserGetOneByIdUseCase.execute.mockResolvedValue(null);

      const result = await userController.findOne(userId);
      expect(result).toBeNull();
      expect(mockUserGetOneByIdUseCase.execute).toHaveBeenCalledWith(userId);
    });
  });
  describe('update', () => {
    it('should update the user successfully', async () => {
      const userId = 1;
      const updatedData = { name: 'John Doe Updated' };
      const updatedUser = {
        id: 1,
        name: 'John Doe Updated',
        email: 'john@example.com',
      };
      mockUserUpdateUseCase.execute.mockResolvedValue(updatedUser);

      const result = await userController.update(userId, updatedData);
      expect(result).toEqual(updatedUser);
      expect(mockUserUpdateUseCase.execute).toHaveBeenCalledWith(
        userId,
        updatedData,
      );
    });

    it('should return null if user not found', async () => {
      const userId = 999;
      const updatedData = { name: 'Non Existent User' };
      mockUserUpdateUseCase.execute.mockResolvedValue(null);

      const result = await userController.update(userId, updatedData);
      expect(result).toBeNull();
      expect(mockUserUpdateUseCase.execute).toHaveBeenCalledWith(
        userId,
        updatedData,
      );
    });
  });
});
