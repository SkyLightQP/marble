import { IsNotEmpty, IsString } from 'class-validator';

export class StartGameDto {
  @IsNotEmpty()
  @IsString()
  roomId!: string;
}
