import { IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { Developer } from '../entities/developer.entity';
import { Type } from 'class-transformer';

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsOptional()
  owner: Developer;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => Developer)
  developers: Developer[];
}
