import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@techhelpdesk.com'})
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'admin123'})
  @IsNotEmpty()
  password: string;
}
