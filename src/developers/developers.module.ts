import { Module } from '@nestjs/common';
import { DevelopersController } from './developers.сontroller';
import { DevelopersService } from './developers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Developer } from './entity/developer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Developer])],
  controllers: [DevelopersController],
  providers: [DevelopersService],
  exports: [DevelopersService],
})
export class DevelopersModule {}
