import { Get, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Project } from './entity/project.entity';
import { Company } from '../companies/entity/company.entity';
import { DevelopersService } from '../developers/developers.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private devService: DevelopersService,
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

  getProjectsWithDevelopers(): Promise<Project[]> {
    return this.projectsRepository.createQueryBuilder('project')
      .leftJoinAndSelect('project.developers', 'developer')
      .getMany();
  }

  getProjectWithDevelopers(id: string): Promise<Project[]> {
    return this.projectsRepository.createQueryBuilder('project')
      .innerJoinAndSelect('company.developers', 'developer', 'developer.project = :id', {id: id})
      .getMany();
  }

  async update(project: Project, id: string): Promise<Project> {
    const projectFromDB = await this.projectsRepository.findOne(id);
    this.projectsRepository.merge(projectFromDB, project);
    return await this.projectsRepository.save(projectFromDB);
  }

  /*async addUser(projectId: string, userId: string): Promise<Project> {
    const project = await this.projectsRepository.findOne(projectId);
    const developer = await this.devService.findOne(userId);
    if (!project.developers) {
      project.developers = [];
    }
    console.log(project);
    project.developers.push(developer);
    return await this.projectsRepository.save(project);
  }*/

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
