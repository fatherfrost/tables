import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { MessageListener } from './listener';

@Module({
  controllers: [MessageListener],
  providers: [SharedService],
  exports: [SharedService],
})
export class EventsModule {}
