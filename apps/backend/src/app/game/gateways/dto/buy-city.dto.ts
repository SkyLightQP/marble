import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CityType } from '@/infrastructure/common/types/city-type.type';

export class BuyCityDto {
  @IsNotEmpty()
  @IsString()
  roomId!: string;

  @IsNotEmpty()
  @IsNumber()
  cityId!: number;

  @IsNotEmpty()
  @IsString()
  cityType!: CityType;
}
