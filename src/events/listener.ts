import { EventHandler } from './eventHandler';
import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class MessageListener {
  @Get('/')
  listen() {
    EventHandler.emit({name: 'console-log', data: {isOk: true}});
  }
}
