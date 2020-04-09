import { EventHandler } from './eventHandler';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('test')
export class EmitEventController {
  @Get('/:event')
  listen(@Param('event') event: string) {
    EventHandler.emit({name: event, data: {isOk: true}});
  }
}
