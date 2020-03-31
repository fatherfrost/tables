import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

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
}
