import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { TicketStatus } from '../entities/ticket.entity';

export class UpdateTicketStatusDto {
  @ApiProperty({ enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] })
  @IsEnum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'])
  status: TicketStatus;
}
