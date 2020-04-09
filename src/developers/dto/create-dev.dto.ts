import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Company } from '../../companies/entity/company.entity';
import { Project } from '../../projects/entity/project.entity';
import { Type } from 'class-transformer';

export class CreateDevDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(18)
  age: number;

  @IsBoolean()
  @IsOptional()
  IsStrange: boolean;

  @IsString()
  @IsOptional()
  @Type(() => Company)
  company: Company;

  @IsString()
  @IsOptional()
  @Type(() => Project)
  project: Project;
}
