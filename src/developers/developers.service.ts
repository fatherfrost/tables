import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from './entity/developer.entity';
import { getConnection, Repository } from 'typeorm';
import { SseService } from '../sse/sse.service';
// import { MyEmitter } from '../eventEmitter';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(Developer)  
    private developersRepository: Repository<Developer>,
    // private sseService: SseService,
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

  test(name: string): string {
    console.log('In service, ', name);
    // this.sseService.send({name: 'HUI PIDOR EBANIY'});
    return name;
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
}
