import { Injectable } from '@nestjs/common';
import { CityType } from '@/infrastructure/common/types/city-type.type';

const LAND_PENALTY_RATIO = 0.7;
const HOUSE_PENALTY_RATIO = 1.5;
const BUILDING_PENALTY_RATIO = 2;
const HOTEL_PENALTY_RATIO = 2.7;

@Injectable()
export class CalculatePenaltyService {
  calculate(
    haveCityTypes: CityType[],
    price: { land: number; house: number; building: number; hotel: number }
  ): number {
    let penalty = 0;

    haveCityTypes.forEach((cityType) => {
      switch (cityType) {
        case 'land':
          penalty += Math.floor(price.land * LAND_PENALTY_RATIO);
          break;
        case 'house':
          penalty += Math.floor(price.house * HOUSE_PENALTY_RATIO);
          break;
        case 'building':
          penalty += Math.floor(price.building * BUILDING_PENALTY_RATIO);
          break;
        case 'hotel':
          penalty += Math.floor(price.hotel * HOTEL_PENALTY_RATIO);
          break;
        default:
      }
    });

    return penalty;
  }
}
