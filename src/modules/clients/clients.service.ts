import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly repo: Repository<Client>,
  ) {}

  async create(dto: CreateClientDto) {
    const client = this.repo.create(dto);
    return this.repo.save(client);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const client = await this.repo.findOne({ where: { id } });
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async update(id: string, dto: UpdateClientDto) {
    const client = await this.findOne(id);
    Object.assign(client, dto);
    return this.repo.save(client);
  }

  async remove(id: string) {
    const client = await this.findOne(id);
    await this.repo.remove(client);
    return { deleted: true };
  }
}
