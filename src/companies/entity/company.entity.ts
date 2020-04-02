import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany, JoinColumn, ManyToOne,
} from 'typeorm';
import { Developer } from '../../developers/entity/developer.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToMany(
    type => Developer,
    developer => developer.company,
  )
  developers: Developer[];
}
