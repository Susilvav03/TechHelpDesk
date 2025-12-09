import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateClientDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(150)
  company: string;

  @ApiProperty()
  @IsEmail()
  contactEmail: string;
}
