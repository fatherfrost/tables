import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { Developer } from './developer.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToOne(type => Developer, user => user.id)
  owner: Developer;

  @OneToMany(type => Developer, user => user.id)
  developers: Developer[];
}
