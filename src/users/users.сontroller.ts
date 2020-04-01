import {
  Body,
  Controller,
  Get, Param, Post, Req, ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { plainToClass } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  async createUser(@Req() request,
             @Body(new ValidationPipe({ whitelist: true })) createUserDto: CreateUserDto): Promise<User> {
    const user = plainToClass(User, createUserDto);
    return this.usersService.create(user)
  }
}
