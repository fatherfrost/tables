import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  async create(company: Company): Promise<Company> {
    return this.companiesRepository.create(company);
  }

  findAll(): Promise<Company[]> {
    return this.companiesRepository.find();
  }

  findOne(id: string): Promise<Company> {
    return this.companiesRepository.findOne(id);
  }
}
