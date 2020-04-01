import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  @OneToOne(() => User, user => user.id)
  owner: User;

  @Column()
  @OneToMany(() => User, user => user.id)
  developers: User[];
}
