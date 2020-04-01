import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Developer } from '../entities/developer.entity';
import { Company } from '../entities/company.entity';

export class UpdateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsArray()
  @IsOptional()
  stack: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  maxDevelopers: number;

  @IsOptional()
  @Type(() => Company)
  company: Company;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => Developer)
  developers: Developer[];
}
