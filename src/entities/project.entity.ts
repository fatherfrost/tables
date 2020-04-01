import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { Company } from './company.entity';
import { User } from './user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  @ManyToOne(type => Company, company => company.id)
  company: Company;

  @Column()
  stack: string[];

  @Column()
  @OneToMany(type => User, user => user.id)
  developers: User[];

  @Column()
  maxDevelopers: number;
}
