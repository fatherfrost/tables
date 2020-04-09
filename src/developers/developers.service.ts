import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from './entity/developer.entity';
import { getConnection, Repository } from 'typeorm';
import * as fs from "fs";

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
    const userFromDB = await this.developersRepository.findOne(id);
    this.developersRepository.merge(userFromDB, user);
    console.log(userFromDB);
    return await this.developersRepository.save(userFromDB);
  }

  async delete(id: string): Promise<boolean> {
    // const query = `DELETE FROM developer WHERE "id" = '${id}'`;
    // const result = await this.entityManager.query(query);
    const result = await this.developersRepository.delete(id);
    return !!result;
  }

  async findAll(): Promise<Developer[]> {
    // return await this.entityManager.query('DELETE * FROM developer');
    return await this.developersRepository.find();
  }

  async findOne(id: string): Promise<Developer> {
    // const query = `SELECT * FROM developer WHERE "id" = '${id}'`;
    // return await this.entityManager.query(query);
    const user =  await this.developersRepository.findOne(id);
    return user;
  }

  async parse() {
    console.log(' in service');
    const data =  await this.readFile();
    console.log(data);
    // const doc = new DOMParser().parseFromString(data, 'text/rdf');
    return data;
  }

  readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile('book.rdf', 'utf8', (error, data) => {
        if (error) {
          console.log(error);
          reject();
        }
        if (data) resolve(data);
      })
    })
  }
}
