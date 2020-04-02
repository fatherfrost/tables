import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, getConnection, Repository } from 'typeorm';
import { Company } from './entity/company.entity';
import { DevelopersService } from '../developers/developers.service';
import { Developer } from '../developers/entity/developer.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
    private devService: DevelopersService,
  ) {}

  async create(company: Company): Promise<boolean> {
    console.log(company, '----------');
    const created = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Company)
      .values(company)
      .execute();

    return !!created;
  }

  async getCompaniesWithDevelopers(): Promise<Company[]> {
    const joinDev = this.companiesRepository.createQueryBuilder('company')
      .leftJoinAndSelect('company.developers', 'developer')
      .getMany();
    return joinDev;
  }

  async getCompanyWithDevelopers(id: string): Promise<Company[]> {
    console.log(id);
    const joinDev = await this.companiesRepository.createQueryBuilder('company')
      .innerJoinAndSelect('company.developers', 'developer', 'developer.company = :id', {id: id})
      .getMany();
    return joinDev;
  }

  async update(company: Company, id: string): Promise<Company> {
    const companyFromDB = await this.companiesRepository.findOne(id);
    this.companiesRepository.merge(companyFromDB, company);
    return await this.companiesRepository.save(companyFromDB);
  }

  async addUser(companyId: string, userId: string): Promise<Company> {
    const company = await this.companiesRepository.findOne(companyId);
    const developer = await this.devService.findOne(userId);
    if (!company.developers) {
      company.developers = [];
    };
    console.log(company);
    company.developers.push(developer);
    return await this.companiesRepository.save(company);
  }


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
