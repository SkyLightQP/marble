import { IsNotEmpty, IsString } from 'class-validator';

export class ToggleReadyDto {
  @IsNotEmpty()
  @IsString()
  roomId!: string;
}
