import { IsNotEmpty, IsString } from 'class-validator';

export class GetGameDto {
  @IsNotEmpty()
  @IsString()
  roomId!: string;
}
