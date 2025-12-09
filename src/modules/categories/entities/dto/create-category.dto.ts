import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MaxLength(255)
  description?: string;
}
