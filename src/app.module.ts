import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevelopersModule } from './developers/developers.module';
import { Developer } from './developers/entity/developer.entity';
import { Company } from './companies/entity/company.entity';
import { Project } from './projects/entity/project.entity';
import { ProjectsModule } from './projects/projects.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'olsnis',
      password: 'korol32k53',
      database: 'tablesdb',
      entities: [Developer, Company, Project],
      synchronize: true,
    }),
    DevelopersModule,
    ProjectsModule,
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
