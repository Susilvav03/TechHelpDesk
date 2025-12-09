import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { TicketPriority } from '../entities/ticket.entity';

export class CreateTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'MEDIUM' })
  @IsEnum(['LOW', 'MEDIUM', 'HIGH'])
  priority: TicketPriority;

  @ApiProperty()
  @IsUUID()
  categoryId: string;

  @ApiProperty()
  @IsUUID()
  clientId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  technicianId?: string;
}
