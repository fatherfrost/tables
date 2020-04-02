import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Company } from '../../companies/entity/company.entity';
import { Developer } from '../../developers/entity/developer.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @ManyToOne(
    type => Company,
    company => company.id,
  )
  company: Company;

  @Column()
  stack: string;

  @OneToMany(
    type => Developer,
    user => user.project,
  )
  developers: Developer[];

  @Column()
  maxDevelopers: number;
}
