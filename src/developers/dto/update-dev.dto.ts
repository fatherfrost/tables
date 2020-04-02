import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';
import { Company } from '../../companies/entity/company.entity';
import { Project } from '../../projects/entity/project.entity';

export class UpdateDevDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsOptional()
  @Min(18)
  age: number;

  @IsOptional()
  company: Company;

  @IsOptional()
  project: Project;
}
