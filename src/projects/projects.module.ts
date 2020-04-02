import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entity/project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.сontroller';
import { Developer } from '../developers/entity/developer.entity';
import { DevelopersModule } from '../developers/developers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), TypeOrmModule.forFeature([Developer]), DevelopersModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
