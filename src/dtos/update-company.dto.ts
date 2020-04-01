import { IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { User } from '../entities/user.entity';
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
  owner: User;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => User)
  developers: User[];
}
