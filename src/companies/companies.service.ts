import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Company } from './entity/company.entity';
import { DevelopersService } from '../developers/developers.service';
import { EventService } from '../eventEmitter';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
    // private emitter: MyEmitter,
    private emitter: EventService,
    // private devService: DevelopersService,
  ) {}

  async create(company: Company): Promise<boolean> {
    const created = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Company)
      .values(company)
      .execute();

    return !!created;
  }

  test() {
    console.log('kek kek ');
    // this.emitter.emit('test', {text: 1});
    return 1;
  }

  getCompaniesWithDevelopers(): Promise<Company[]> {
    return this.companiesRepository.createQueryBuilder('company')
      .leftJoinAndSelect('company.developers', 'developer')
      .printSql()
      .getMany();
  }

  getCompanyWithDevelopers(id: string): Promise<Company[]> {
    const sql =  this.companiesRepository.createQueryBuilder('company')
      .innerJoinAndSelect('company.developers', 'developer', 'developer.company = :id', {id: id})
      .getSql();
    console.log(sql);
    return this.companiesRepository.createQueryBuilder('company')
      .innerJoinAndSelect('company.developers', 'developer', 'developer.company = :id', {id: id})
      .getMany();
  }

  async update(company: Company, id: string): Promise<Company> {
    const companyFromDB = await this.companiesRepository.findOne(id);
    this.companiesRepository.merge(companyFromDB, company);
    return await this.companiesRepository.save(companyFromDB);
  }

/*  async addUser(companyId: string, userId: string): Promise<Company> {
    const company = await this.companiesRepository.findOne(companyId);
    const developer = await this.devService.findOne(userId);
    if (!company.developers) {
      company.developers = [];
    }
    company.developers.push(developer);
    return await this.companiesRepository.save(company);
  }*/


  async delete(id: string): Promise<boolean> {
    const result = await this.companiesRepository.delete(id);
    return !!result;
  }

  async findAll(): Promise<Company[]> {
    return await this.companiesRepository.find();
  }

  async findOne(id: string): Promise<Company> {
    return await this.companiesRepository.findOne(id);
  }
}
