import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

// Base DTO for creating a location
export class CreateLocationDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  country: string;
}

// Extended DTO for updating a location
export class UpdateLocationDto extends PartialType(CreateLocationDto) {}
