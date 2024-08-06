import { IsString, IsEmail } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

// Base DTO for creating a user
export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

// Extended DTO for updating a user
export class UpdateUserDto extends PartialType(CreateUserDto) {}
