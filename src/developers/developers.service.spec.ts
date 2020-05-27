import { DevelopersService } from './developers.service';
import { Developer } from './entity/developer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

describe('Developers service', () => {
  let developersService;
  const developer: Developer = {
    id: '1',
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
  const developerExpected: Developer = {
    id: '1',
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

  beforeEach(async () => {
    const developersRepository = new Repository<Developer>();
    developersService = new DevelopersService(developersRepository);

    jest.spyOn(developersRepository, 'findOne').mockImplementation(
      () : Promise<Developer> => {
        return Promise.resolve(developer);
      }
    );

    jest.spyOn(developersRepository, 'find').mockImplementation(
      () : Promise<Developer[]> => {
        return Promise.resolve([developer]);
      }
    )
  });

  it('should return developer', async () => {
    const result = await developersService.findOne(1);
    expect(result).toEqual(developerExpected);
  })
});
