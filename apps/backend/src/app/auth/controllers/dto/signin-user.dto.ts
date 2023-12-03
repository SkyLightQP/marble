import { IsNotEmpty, IsString } from 'class-validator';

export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
