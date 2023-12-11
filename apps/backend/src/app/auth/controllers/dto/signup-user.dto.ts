import { IsNotEmpty, IsString } from 'class-validator';

export class SignupUserDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  nickname!: string;
}
