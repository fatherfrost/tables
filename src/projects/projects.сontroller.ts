import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { ProjectsService } from './projects.service';
import { Project } from './entity/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { EventDecorator } from '../decorator';


@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService
  ) {}

  @Get('/details')
  getProjectsWithDevelopers(@Query('id') id: string): Promise<Project[]> {
    if (id !== undefined) {
      return this.projectsService.getProjectWithDevelopers(id);
    }
    return this.projectsService.getProjectsWithDevelopers();
  }

  @Get()
  @EventDecorator('ping-projects')
  getAllProjects(): any {
    console.log('GET ALL PROJECTS', ' --------- ');
    // return this.projectsService.findAll();
    return 1;
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @EventDecorator('ping-projects')
  consoleLogSomeHernya(): void {
    console.log('HERNYAAAAAAAAAAAAAAAA');
  }

  @Post()
  async createProject(
    @Req() request: Request,
    @Res() res: Response,
    @Body(new ValidationPipe({ whitelist: true }))
    createProjectDto: CreateProjectDto,
  ): Promise<void> {
    const project = plainToClass(Project, createProjectDto);
    const result = await this.projectsService.create(project);
    if (result) {
      res.sendStatus(200);
    } else {
      throw new BadRequestException();
    }
  }

  @Put('/:id/:userId')
  async addUser(
    @Req() request: Request,
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<Project> {
    return this.projectsService.addUser(id, userId);
  }

  @Put('/:id')
  async updateProject(
    @Req() request: Request,
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true }))
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = plainToClass(Project, updateProjectDto);
    return this.projectsService.update(project, id);
  }

  @Delete('/:id')
  async deleteProject(
    @Req() request: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    try {
      await this.projectsService.delete(id);
      res.sendStatus(200);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
