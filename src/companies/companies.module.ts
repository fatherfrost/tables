import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entity/company.entity';
import { CompaniesController } from './companies.сontroller';
import { CompaniesService } from './companies.service';
import { Developer } from '../developers/entity/developer.entity';
import { DevelopersModule } from '../developers/developers.module';
import {SSEMiddleware} from "nestjs-sse";
// import { MyEmitter } from '../eventEmitter';
import { DevelopersController } from '../developers/developers.сontroller';
import { EventService } from '../eventEmitter';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), TypeOrmModule.forFeature([Developer])],
  controllers: [CompaniesController],
  providers: [CompaniesService, /*MyEmitter*/ EventService],
  exports: [CompaniesService],
})
export class CompaniesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SSEMiddleware)
      .forRoutes(CompaniesController);
  }
}
