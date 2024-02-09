import { ICommand } from '@nestjs/cqrs';
import { CityType } from '@/infrastructure/common/types/city-type.type';

export class BuyCityCommand implements ICommand {
  constructor(
    readonly args: {
      readonly roomId: string;
      readonly cityId: number;
      readonly cityType: CityType;
      readonly executor: string;
    }
  ) {}
}
