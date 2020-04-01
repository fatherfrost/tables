import {
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength, ValidateNested,
} from 'class-validator';
import { Company } from '../entities/company.entity';
import { User } from '../entities/user.entity';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsArray()
  @IsOptional()
  stack: string[];

  @IsNumber()
  @IsOptional()
  @Min(1)
  maxDevelopers: number;

  @IsNotEmptyObject()
  @Type(() => Company)
  company: Company;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => User)
  developers: User[];
}
