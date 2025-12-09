import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Category } from '../modules/categories/entities/category.entity';
import { Client } from '../modules/clients/entities/client.entity';
import { Technician } from '../modules/technicians/entities/technician.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
    @InjectRepository(Client) private clientsRepo: Repository<Client>,
    @InjectRepository(Technician) private techniciansRepo: Repository<Technician>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    const count = await this.usersRepo.count();
    if (count > 0) return;

    const admin = this.usersRepo.create({
      name: 'Admin',
      email: 'admin@techhelpdesk.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
    });

    await this.usersRepo.save(admin);

    const categories = this.categoriesRepo.create([
      { name: 'Solicitud', description: 'Requerimientos generales' },
      { name: 'Incidente de Hardware', description: 'Problemas hardware' },
      { name: 'Incidente de Software', description: 'Problemas software' },
    ]);
    await this.categoriesRepo.save(categories);

    const client = this.clientsRepo.create({
      name: 'Cliente Demo',
      company: 'Empresa XYZ',
      contactEmail: 'cliente@xyz.com',
    });
    await this.clientsRepo.save(client);

    const tech = this.techniciansRepo.create({
      name: 'Técnico Demo',
      specialty: 'Soporte general',
      availability: true,
    });
    await this.techniciansRepo.save(tech);
  }
}
