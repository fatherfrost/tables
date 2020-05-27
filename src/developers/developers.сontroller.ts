import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { Developer } from './entity/developer.entity';
import { CreateDevDto } from './dto/create-dev.dto';
import { plainToClass } from 'class-transformer';
import { UpdateDevDto } from './dto/update-dev.dto';
import { Request } from 'express';
import { Response } from 'nestjs-sse';
import { Connection } from '../sse/connection';
// import { SseService } from '../sse/sse.service';
// import { MyEmitter } from '../eventEmitter';

@Controller('developers')
export class DevelopersController {
  // myEmitter = new MyEmitter();
  constructor(private readonly developersService: DevelopersService) {}

  @Get()
  getAllUsers(): Promise<Developer[]> {
    return this.developersService.findAll();
  }

  @Get('test/:name')
  test(@Param('name') name: string) {
    console.log('In controller, ', name);
    // this.myEmitter.emit('test', {name: name});
    // return this.developersService.test(name);
  }

 /* @Post()
  async createUser(
    @Req() request: Request,
    @Res() res: Response,
    @Body(new ValidationPipe({ whitelist: true })) createUserDto: CreateDevDto,
  ): Promise<void> {
    const user = plainToClass(Developer, createUserDto);
    const result = await this.developersService.create(user);
    if (result) {
      res.sendStatus(200);
    } else {
      throw new BadRequestException();
    }
  }

  @Put('/:id')
  async updateUser(
    @Req() request: Request,
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true })) updateUserDto: UpdateDevDto,
  ): Promise<Developer> {
    const user = plainToClass(Developer, updateUserDto);
    return this.developersService.update(user, id);
  }

  @Delete('/:id')
  async deleteUser(
    @Req() request: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    try {
      await this.developersService.delete(id);
      res.sendStatus(200);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }*/

 /* @Get('/connect')
  connect(@Res() res: Response) {
    console.log('Connecting developers');
    res.sse(`data: ${JSON.stringify({name: 'Alex', age: 24})}\n\n`);
    /!*console.log('-----------------');
    this.myEmitter.on('test', (data) => {
      console.log(data);
      res.sse(`data: ${JSON.stringify(data)}\n\n`);
    });*!/
  }*/
}
