import { IsNotEmpty, IsString } from 'class-validator';

export class QuitRoomDto {
  @IsNotEmpty()
  @IsString()
  roomId!: string;
}
