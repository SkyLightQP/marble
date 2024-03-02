import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(2)
  @Max(4)
  maxPlayer!: number;
}
