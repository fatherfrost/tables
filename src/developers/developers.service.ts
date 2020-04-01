import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from '../entities/developer.entity';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(Developer)
    private devsRepository: Repository<Developer>,
  ) {}

  async create(user: Developer): Promise<boolean> {
    /*const a =  this.devsRepository.create(user);
    console.log(a, ' 10101001010101001');
    return a;*/

    const created =  await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Developer)
      .values(user)
      .execute();

    return !!created;
  }

  async update(user: Developer, id: string): Promise<Developer> {
    const userFromDB = await this.devsRepository.findOne(id);
    this.devsRepository.merge(userFromDB, user);
    return await this.devsRepository.save(userFromDB);

  }

  async delete(id: string): Promise<boolean> {
    const result =  await this.devsRepository.delete(id);
    return !!result;
  }

  async findAll(): Promise<Developer[]> {
    const all = await this.devsRepository.find();
    console.log(all, '-------------');
    return all;
  }

  findOne(id: string): Promise<Developer> {
    return this.devsRepository.findOne(id);
  }
}
