import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { User } from '../modules/users/entities/user.entity';
import { Category } from '../modules/categories/entities/category.entity';
import { Client } from '../modules/clients/entities/client.entity';
import { Technician } from '../modules/technicians/entities/technician.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Category, Client, Technician]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
