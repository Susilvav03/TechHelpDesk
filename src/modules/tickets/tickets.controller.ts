import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';

@ApiTags('Tickets')
@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  // Client creates ticket
  @Roles('CLIENT', 'ADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new ticket' })
  create(@Body() dto: CreateTicketDto) {
    return this.ticketsService.create(dto);
  }

  // Admin sees all tickets
  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Get all tickets' })
  findAll() {
    return this.ticketsService.findAll();
  }

  // Client searches by id (use of @Param @Get(':id'))
  @Roles('CLIENT', 'ADMIN')
  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the ticket' })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  // History by client
  @Roles('CLIENT', 'ADMIN')
  @Get('client/:id')
  @ApiOperation({ summary: 'Get tickets by client ID' })
  @ApiParam({ name: 'id', description: 'UUID of the client' })
  findByClient(@Param('id') clientId: string) {
    return this.ticketsService.findByClient(clientId);
  }

  // List by technician
  @Roles('TECHNICIAN', 'ADMIN')
  @Get('technician/:id')
  @ApiOperation({ summary: 'Get tickets by technician ID' })
  @ApiParam({ name: 'id', description: 'UUID of the technician' })
  findByTechnician(@Param('id') technicianId: string) {
    return this.ticketsService.findByTechnician(technicianId);
  }

  // Change status (only technician or admin)
  @Roles('TECHNICIAN', 'ADMIN')
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update ticket status by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the ticket' })
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTicketStatusDto,
  ) {
    return this.ticketsService.updateStatus(id, dto);
  }
}
