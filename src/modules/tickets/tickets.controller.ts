import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';

@ApiTags('Tickets')
@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  // Cliente crea tickets
  @Roles('CLIENT')
  @Post()
  create(@Body() dto: CreateTicketDto) {
    return this.ticketsService.create(dto);
  }

  // Admin ve todos
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  // Cliente busca por id (uso de @Param @Get(':id'))
  @Roles('CLIENT')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  // Historial por cliente
  @Roles('CLIENT', 'ADMIN')
  @Get('client/:id')
  findByClient(@Param('id') clientId: string) {
    return this.ticketsService.findByClient(clientId);
  }

  // Listar por técnico
  @Roles('TECHNICIAN', 'ADMIN')
  @Get('technician/:id')
  findByTechnician(@Param('id') technicianId: string) {
    return this.ticketsService.findByTechnician(technicianId);
  }

  // Cambio de estado (solo técnico o admin)
  @Roles('TECHNICIAN', 'ADMIN')
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTicketStatusDto,
  ) {
    return this.ticketsService.updateStatus(id, dto);
  }
}
