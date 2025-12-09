import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Category } from '../modules/categories/entities/category.entity';
import { Client } from '../modules/clients/entities/client.entity';
import { Technician } from '../modules/technicians/entities/technician.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
    @InjectRepository(Client) private clientsRepo: Repository<Client>,
    @InjectRepository(Technician) private techniciansRepo: Repository<Technician>,
  ) {}

  async onModuleInit() {
    this.logger.log('🔄 Executing database seed...');
    await this.seed();
    this.logger.log('✅ Database seed completed');
  }

  private async seed() {
    const count = await this.usersRepo.count();
    if (count > 0) {
      this.logger.log('⏭ Seed skipped: users already exist in the database');
      return;
    }

    this.logger.log('👤 Creating admin user...');
    const admin = this.usersRepo.create({
      name: 'Admin',
      email: 'admin@techhelpdesk.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
    });

    await this.usersRepo.save(admin);

    this.logger.log('📂 Creating base categories...');
    const categories = this.categoriesRepo.create([
      { name: 'Request', description: 'General requirements' },
      { name: 'Hardware Incident', description: 'Hardware issues' },
      { name: 'Software Incident', description: 'Software issues' },
    ]);
    await this.categoriesRepo.save(categories);

    this.logger.log('🏢 Creating demo client...');
    const client = this.clientsRepo.create({
      name: 'Demo Client',
      company: 'XYZ Company',
      contactEmail: 'client@xyz.com',
    });
    await this.clientsRepo.save(client);

    this.logger.log('🛠 Creating demo technician...');
    const tech = this.techniciansRepo.create({
      name: 'Demo Technician',
      specialty: 'General support',
      availability: true,
    });
    await this.techniciansRepo.save(tech);
  }
}
