import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

// Base DTO for creating an item
export class CreateItemDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}

// Extended DTO for updating an item
export class UpdateItemDto extends PartialType(CreateItemDto) {}
