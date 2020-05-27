import { Injectable } from '@nestjs/common';
import { CompaniesController } from '../companies/companies.сontroller';

@Injectable()
export class SseService {
  constructor(private controller: CompaniesController) {}

  send(data) {
    this.controller.connection(data);
  }

}
