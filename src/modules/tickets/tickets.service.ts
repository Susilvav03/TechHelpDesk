import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, TicketStatus } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
import { Category } from '../categories/entities/category.entity';
import { Client } from '../clients/entities/client.entity';
import { Technician } from '../technicians/entities/technician.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
    @InjectRepository(Technician)
    private readonly technicianRepo: Repository<Technician>,
  ) {}

  private ensureValidTransition(current: TicketStatus, next: TicketStatus) {
    const allowed: Record<TicketStatus, TicketStatus[]> = {
      OPEN: ['IN_PROGRESS'],
      IN_PROGRESS: ['RESOLVED'],
      RESOLVED: ['CLOSED'],
      CLOSED: [],
    };

    if (!allowed[current].includes(next)) {
      throw new BadRequestException(
        `Invalid status transition from ${current} to ${next}`,
      );
    }
  }

  private async ensureTechnicianCapacity(technicianId: string) {
    const count = await this.ticketRepo.count({
      where: { technician: { id: technicianId }, status: 'IN_PROGRESS' },
    });
    if (count >= 5) {
      throw new BadRequestException(
        'Technician already has 5 tickets in progress',
      );
    }
  }

  async create(dto: CreateTicketDto) {
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');

    const client = await this.clientRepo.findOne({
      where: { id: dto.clientId },
    });
    if (!client) throw new NotFoundException('Client not found');

    let technician: Technician | null = null;
    if (dto.technicianId) {
      technician = await this.technicianRepo.findOne({
        where: { id: dto.technicianId },
      });
      if (!technician) throw new NotFoundException('Technician not found');
      await this.ensureTechnicianCapacity(dto.technicianId);
    }

    const ticket = this.ticketRepo.create({
      title: dto.title,
      description: dto.description,
      priority: dto.priority,
      category,
      client,
      technician,
    });

    return this.ticketRepo.save(ticket);
  }

  findAll() {
    return this.ticketRepo.find();
  }

  async findOne(id: string) {
    const ticket = await this.ticketRepo.findOne({ where: { id } });
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

  async updateStatus(id: string, dto: UpdateTicketStatusDto) {
    const ticket = await this.findOne(id);
    this.ensureValidTransition(ticket.status, dto.status);

    if (dto.status === 'IN_PROGRESS' && ticket.technician) {
      await this.ensureTechnicianCapacity(ticket.technician.id);
    }

    ticket.status = dto.status;
    return this.ticketRepo.save(ticket);
  }

  findByClient(clientId: string) {
    return this.ticketRepo.find({ where: { client: { id: clientId } } });
  }

  findByTechnician(technicianId: string) {
    return this.ticketRepo.find({
      where: { technician: { id: technicianId } },
    });
  }
}
