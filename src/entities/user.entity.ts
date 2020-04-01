import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { Company } from './company.entity';
import { Project } from './project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @ManyToOne(type => Company, company => company.id)
  @Column()
  company: Company;

  @Column()
  @OneToMany(type => Project, project => project.id)
  project: Project;
}
