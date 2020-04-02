import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Project } from './entity/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(project: Project): Promise<boolean> {
    const created = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Project)
      .values(project)
      .execute();

    return !!created;
  }

  async update(project: Project, id: string): Promise<Project> {
    const projectFromDB = await this.projectsRepository.findOne(id);
    this.projectsRepository.merge(projectFromDB, project);
    return await this.projectsRepository.save(projectFromDB);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.projectsRepository.delete(id);
    return !!result;
  }

  async findAll(): Promise<Project[]> {
    return await this.projectsRepository.find();
  }

  findOne(id: string): Promise<Project> {
    return this.projectsRepository.findOne(id);
  }
}
