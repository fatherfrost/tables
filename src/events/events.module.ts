import { Module } from '@nestjs/common';
import { EmitEventController } from './emit-event.controller';

@Module({
  controllers: [EmitEventController],
})
export class EventsModule {}
