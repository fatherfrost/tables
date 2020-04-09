import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import { DevelopersModule } from '../src/developers/developers.module';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { Developer } from '../src/developers/entity/developer.entity';
import { DevelopersService } from '../src/developers/developers.service';
import { DevelopersController } from '../src/developers/developers.сontroller';

describe('Developers (e2e)', () => {
  let app: INestApplication;
  // let developersService: DevelopersService;
  const developer: Developer = {
    id: 1,
    name: 'Alex',
    age: 24,
    email: 'olsnis@pascalium.com',
    company: {
      id: 2,
      name: 'Pascalium',
      location: 'Ukraine',
      developers: [],
    },
    project: {
      id: 2,
      name: 'JAN',
      developers: [],
      maxDevelopers: 10,
      stack: 'FIREBASE',
      company: {
        id: 2,
        name: 'Pascalium',
        location: 'Ukraine',
        developers: [],
      },
    },
  };

  const mockedDevelopersRepository = {
    findOne: (id: number): Promise<Developer> => {
      if (id === 1) {
        return Promise.resolve(developer);
      }
      throw new NotFoundException();
    },
    find: (): Promise<Developer[]> => {
      return Promise.resolve([developer]);
    },
  };


  beforeAll(async () => {
    const mockRepository = {
      findOne: jest.fn().mockImplementation((id: string) => {
        if (id === '1') {
          return Promise.resolve(developer);
        }
        throw new NotFoundException();
      })
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevelopersController],
      providers: [
        DevelopersService,
        {
          provide: getRepositoryToken(Developer),
          useValue: mockRepository,
        }
      ]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/GET find one by ID', async () => {
    await request(app.getHttpServer())
      .get('/developers/1')
      .expect(200)
      .expect(developer);
  });

  it('/GET find one by WRONG ID', async () => {
    await request(app.getHttpServer())
      .get('/developers/12345')
      .expect(404);
  });

});
