import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  // ApiOkResponse,
  // ApiOperation,
  // ApiParam,
  // ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  UserGetAllUseCase,
  UserGetOneByIdUseCase,
  UserCreateUseCase,
  UserUpdateUseCase,
  UserDeleteUseCase,
} from '../../application/user.usecase';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userCreateUseCase: UserCreateUseCase,
    private readonly updateUserUseCase: UserUpdateUseCase,
    private readonly getAllUserUseCase: UserGetAllUseCase,
    private readonly getOneUserUseCase: UserGetOneByIdUseCase,
    private readonly deleteUserUseCase: UserDeleteUseCase,
  ) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userCreateUseCase.execute(createUserDto);
  }
  @Get('')
  async findAll() {
    return this.getAllUserUseCase.execute();
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.getOneUserUseCase.execute(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.deleteUserUseCase.execute(+id);
  }
}
