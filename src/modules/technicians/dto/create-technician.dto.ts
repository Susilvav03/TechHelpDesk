import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateTechnicianDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(150)
  specialty: string;

  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean()
  availability?: boolean = true;
}
