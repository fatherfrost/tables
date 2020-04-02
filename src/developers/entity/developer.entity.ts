import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Company } from '../../companies/entity/company.entity';
import { Project } from '../../projects/entity/project.entity';

@Entity()
export class Developer {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @ManyToOne(
    type => Company,
    company => company.developers,
  )
  company: Company;

  @ManyToOne(
    type => Project,
    project => project.developers,
  )
  project: Project;
}
