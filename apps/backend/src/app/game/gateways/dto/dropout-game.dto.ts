import { IsNotEmpty, IsString } from 'class-validator';

export class DropoutGameDto {
  @IsNotEmpty()
  @IsString()
  roomId!: string;
}
