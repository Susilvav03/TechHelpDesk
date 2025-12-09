import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technician } from './entities/technician.entity';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';

@Injectable()
export class TechniciansService {
  constructor(
    @InjectRepository(Technician)
    private readonly repo: Repository<Technician>,
  ) {}

  async create(dto: CreateTechnicianDto) {
    const technician = this.repo.create(dto);
    return this.repo.save(technician);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const technician = await this.repo.findOne({ where: { id } });
    if (!technician) throw new NotFoundException('Technician not found');
    return technician;
  }

  async update(id: string, dto: UpdateTechnicianDto) {
    const technician = await this.findOne(id);
    Object.assign(technician, dto);
    return this.repo.save(technician);
  }

  async remove(id: string) {
    const technician = await this.findOne(id);
    await this.repo.remove(technician);
    return { deleted: true };
  }
}
