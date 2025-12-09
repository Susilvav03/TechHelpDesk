import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Client } from '../../clients/entities/client.entity';
import { Technician } from '../../technicians/entities/technician.entity';

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
    default: 'OPEN',
  })
  status: TicketStatus;

  @Column({
    type: 'enum',
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'MEDIUM',
  })
  priority: TicketPriority;

  @ManyToOne(() => Category, (category) => category.tickets, {
    eager: true,
    nullable: false,
  })
  category: Category;

  @ManyToOne(() => Client, (client) => client.tickets, {
    eager: true,
    nullable: false,
  })
  client: Client;

  @ManyToOne(() => Technician, (technician) => technician.tickets, {
    eager: true,
    nullable: true,
  })
  technician: Technician | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
