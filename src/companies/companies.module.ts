import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entity/company.entity';
import { CompaniesController } from './companies.сontroller';
import { CompaniesService } from './companies.service';
import { Developer } from '../developers/entity/developer.entity';
import { DevelopersModule } from '../developers/developers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), TypeOrmModule.forFeature([Developer]), DevelopersModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
