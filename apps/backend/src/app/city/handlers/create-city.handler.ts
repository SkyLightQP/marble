import { City, CityPrice } from '@marble/database';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCityCommand } from '@/app/city/commands/create-city.command';
import { DatabaseService } from '@/infrastructure/database/database.service';

export type CreateCityReturn = City & { cityPrices: Array<CityPrice> };

@CommandHandler(CreateCityCommand)
export class CreateCityHandler implements ICommandHandler<CreateCityCommand> {
  constructor(private readonly prisma: DatabaseService) {}

  async execute({ args: { name, icon, position, price } }: CreateCityCommand): Promise<CreateCityReturn> {
    const city = await this.prisma.city.create({
      data: {
        name,
        icon,
        position,
        cityPrices: {
          create: price
        }
      },
      select: {
        id: true,
        name: true,
        icon: true,
        position: true,
        createdAt: true,
        updatedAt: true,
        cityPrices: true
      }
    });

    Logger.log({ message: '새로운 도시를 추가했습니다.', name });

    return city;
  }
}
