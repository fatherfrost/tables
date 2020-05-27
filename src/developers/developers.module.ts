import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DevelopersController } from './developers.сontroller';
import { DevelopersService } from './developers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Developer } from './entity/developer.entity';
import {SSEMiddleware} from "nestjs-sse";
// import { MyEmitter } from '../eventEmitter';
import { SseService } from '../sse/sse.service';
import { CompaniesModule } from '../companies/companies.module';
// import { SseService } from '../sse/sse.service';

@Module({
  imports: [TypeOrmModule.forFeature([Developer])],
  controllers: [DevelopersController],
  providers: [DevelopersService, /*MyEmitter*/],
  exports: [DevelopersService],
})
export class DevelopersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SSEMiddleware)
      .forRoutes(DevelopersController);
  }
}
