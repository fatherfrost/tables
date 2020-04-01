import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevelopersModule } from './developers/developers.module';
import { Developer } from './entities/developer.entity';
import { Company } from './entities/company.entity';
import { Project } from './entities/project.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'olsnis',
    password: 'korol32k53',
    database: 'tablesdb',
    entities: [Developer, Company, Project],
    synchronize: true,
  }), DevelopersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
