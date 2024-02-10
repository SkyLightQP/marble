import { IsNotEmpty, IsString } from 'class-validator';

export class EndTurnDto {
  @IsNotEmpty()
  @IsString()
  roomId!: string;
}
