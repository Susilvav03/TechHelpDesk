import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity({ name: 'technicians' })
export class Technician {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  specialty: string;

  @Column({ default: true })
  availability: boolean;

  @OneToMany(() => Ticket, (ticket) => ticket.technician)
  tickets: Ticket[];
}
