import {
  BadRequestException,
  Body,
  Controller, Delete,
  Get, Param, Post, Put, Req, Res, ValidationPipe,
} from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { Developer } from '../entities/developer.entity';
import { CreateDevDto } from '../dtos/create-dev.dto';
import { plainToClass } from 'class-transformer';
import { UpdateDevDto } from '../dtos/update-dev.dto';
import { Request, Response } from 'express';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly devsService: DevelopersService) {}

  @Get()
  getAllUsers(): Promise<Developer[]> {
    console.log('get all');
    return this.devsService.findAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Developer> {
    return this.devsService.findOne(id);
  }

  @Post()
  async createUser(@Req() request: Request,
                   @Res() res: Response,
             @Body(new ValidationPipe({ whitelist: true })) createUserDto: CreateDevDto): Promise<void> {
    const user = plainToClass(Developer, createUserDto);
    const result = await this.devsService.create(user);
    if (result) {
      res.sendStatus(200);
    } else {
      throw new BadRequestException();
    }
  }

  @Put('/:id')
  async updateUser(@Req() request: Request,
                   @Param('id') id: string,
                   @Body(new ValidationPipe({ whitelist: true })) updateUserDto: UpdateDevDto): Promise<Developer> {
    const user = plainToClass(Developer, updateUserDto);
    return this.devsService.update(user, id)
  }

  @Delete()
  async deleteUser(@Req() request: Request, @Res() res: Response, @Param('id') id: string): Promise<void> {
    try {
      await this.devsService.delete(id);
      res.sendStatus(200);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
