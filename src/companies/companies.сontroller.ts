import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { CompaniesService } from './companies.service';
import { Company } from './entity/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { IsNotEmptyObject } from 'class-validator';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get('/details')
  getCompaniesWithDevelopers(@Query('id') id: string): Promise<Company[]> {
    if (id !== undefined) {
      return this.companiesService.getCompanyWithDevelopers(id);
    }
    return this.companiesService.getCompaniesWithDevelopers();
  }

  @Get()
  getAllUsers(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Company> {
    return this.companiesService.findOne(id);
  }

  @Post()
  async createCompany(
    @Req() request: Request,
    @Res() res: Response,
    @Body(new ValidationPipe({ whitelist: true }))
    createCompanyDto: CreateCompanyDto,
  ): Promise<void> {
    console.log('1111111111');
    const company = plainToClass(Company, createCompanyDto);
    const result = await this.companiesService.create(company);
    console.log(result, ' -------------');
    if (result) {
      res.sendStatus(200);
    } else {
      throw new BadRequestException();
    }
  }

  @Put('/:id/:userId')
  async addUser(
    @Req() request: Request,
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<Company> {
    return this.companiesService.addUser(id, userId);
  }

  @Put('/:id')
  async updateCompany(
    @Req() request: Request,
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true }))
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = plainToClass(Company, updateCompanyDto);
    return this.companiesService.update(company, id);
  }

  @Delete('/:id')
  async deleteCompany(
    @Req() request: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    try {
      await this.companiesService.delete(id);
      res.sendStatus(200);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
