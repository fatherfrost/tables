import { IsNotEmptyObject, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { Developer } from '../entities/developer.entity';
import { Type } from 'class-transformer';

export class CreateCompanyDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsNotEmptyObject()
  @Type(() => Developer)
  owner: Developer;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => Developer)
  developers: Developer[];
}
