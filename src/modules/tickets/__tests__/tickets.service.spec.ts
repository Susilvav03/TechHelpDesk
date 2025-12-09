import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketsService } from '../tickets.service';
import { Ticket } from '../entities/ticket.entity';
import { Category } from '../../categories/entities/category.entity';
import { Client } from '../../clients/entities/client.entity';
import { Technician } from '../../technicians/entities/technician.entity';

describe('TicketsService', () => {
  let service: TicketsService;
  let ticketRepo: Repository<Ticket>;
  let categoryRepo: Repository<Category>;
  let clientRepo: Repository<Client>;
  let technicianRepo: Repository<Technician>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TicketsService,
        { provide: getRepositoryToken(Ticket), useValue: { create: jest.fn(), save: jest.fn(), count: jest.fn() } },
        { provide: getRepositoryToken(Category), useValue: { findOne: jest.fn() } },
        { provide: getRepositoryToken(Client), useValue: { findOne: jest.fn() } },
        { provide: getRepositoryToken(Technician), useValue: { findOne: jest.fn() } },
      ],
    }).compile();

    service = moduleRef.get(TicketsService);
    ticketRepo = moduleRef.get(getRepositoryToken(Ticket));
    categoryRepo = moduleRef.get(getRepositoryToken(Category));
    clientRepo = moduleRef.get(getRepositoryToken(Client));
    technicianRepo = moduleRef.get(getRepositoryToken(Technician));
  });

  it('should create ticket when category and client exist', async () => {
    (categoryRepo.findOne as jest.Mock).mockResolvedValue({ id: 'cat' });
    (clientRepo.findOne as jest.Mock).mockResolvedValue({ id: 'cli' });
    (ticketRepo.create as jest.Mock).mockReturnValue({ title: 't' });
    (ticketRepo.save as jest.Mock).mockResolvedValue({ id: '1', title: 't' });

    const result = await service.create({
      title: 'Test',
      description: 'Desc',
      priority: 'MEDIUM',
      categoryId: 'cat',
      clientId: 'cli',
    } as any);

    expect(result).toEqual({ id: '1', title: 't' });
  });
});
