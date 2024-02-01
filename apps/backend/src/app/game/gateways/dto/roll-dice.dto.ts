import { IsNotEmpty, IsString } from 'class-validator';

export class RollDiceDto {
  @IsNotEmpty()
  @IsString()
  roomId!: string;
}
