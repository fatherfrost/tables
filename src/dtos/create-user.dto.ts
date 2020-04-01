import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Company } from '../entities/company.entity';
import { Project } from '../entities/project.entity';
import { Type } from 'class-transformer';

export class CreateUserDto {
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

  @IsString()
  @IsOptional()
  @Type(() => Company)
  company: Company;

  @IsString()
  @IsOptional()
  @Type(() => Project)
  project: Project;
}
