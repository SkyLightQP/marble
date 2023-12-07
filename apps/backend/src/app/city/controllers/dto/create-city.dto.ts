import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly icon: string;

  @IsNumber()
  @IsNotEmpty()
  readonly landPrice: number;

  @IsNumber()
  @IsNotEmpty()
  readonly housePrice: number;

  @IsNumber()
  @IsNotEmpty()
  readonly buildingPrice: number;

  @IsNumber()
  @IsNotEmpty()
  readonly hotelPrice: number;
}
