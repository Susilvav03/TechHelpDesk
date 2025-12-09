import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import type { Role } from '../../../common/decorators/roles.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: ['ADMIN', 'TECHNICIAN', 'CLIENT'], default: 'CLIENT' })
  @IsEnum(['ADMIN', 'TECHNICIAN', 'CLIENT'])
  role: Role;
}
