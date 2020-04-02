import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from './entity/developer.entity';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(Developer)
    private developersRepository: Repository<Developer>,
  ) {}

  async create(user: Developer): Promise<boolean> {
    const created = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Developer)
      .values(user)
      .execute();

    return !!created;
  }

  async update(user: Developer, id: string): Promise<Developer> {
    console.log(user, ' !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    const userFromDB = await this.developersRepository.findOne(id);
    this.developersRepository.merge(userFromDB, user);
    console.log(userFromDB);
    return await this.developersRepository.save(userFromDB);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.developersRepository.delete(id);
    return !!result;
  }

  async findAll(): Promise<Developer[]> {
    return await this.developersRepository.find();
  }

  async findOne(id: string): Promise<Developer> {
    return await this.developersRepository.findOne(id);
  }
}
