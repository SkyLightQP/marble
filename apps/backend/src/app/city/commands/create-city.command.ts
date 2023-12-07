import { ICommand } from '@nestjs/cqrs';

export class CreateCityCommand implements ICommand {
  constructor(
    readonly args: {
      readonly name: string;
      readonly icon: string;
      readonly price: {
        readonly landPrice: number;
        readonly housePrice: number;
        readonly buildingPrice: number;
        readonly hotelPrice: number;
      };
    }
  ) {}
}
