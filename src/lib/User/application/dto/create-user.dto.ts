import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
// import { ExistId } from 'src/common/validation/exist-id';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email de Usuario',
    nullable: false,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Nombre de Usuario',
    nullable: false,
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  name: string;
}
