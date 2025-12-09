import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 150 })
  company: string;

  @Column()
  contactEmail: string;

  @OneToMany(() => Ticket, (ticket) => ticket.client)
  tickets: Ticket[];
}
