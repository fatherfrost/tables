import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { Company } from './company.entity';
import { Developer } from './developer.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Company, company => company.id)
  company: Company;

  @Column()
  stack: string;

  @OneToMany(type => Developer, user => user.id)
  developers: Developer[];

  @Column()
  maxDevelopers: number;
}
