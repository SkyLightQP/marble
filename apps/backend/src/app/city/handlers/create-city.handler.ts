import { DatabaseService } from '@infrastructure/database/database.service';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCityCommand } from '../commands/create-city.command';

@CommandHandler(CreateCityCommand)
export class CreateCityHandler implements ICommandHandler<CreateCityCommand> {
  constructor(private readonly prisma: DatabaseService) {}

  async execute({ args: { name, icon, price } }: CreateCityCommand) {
    const city = await this.prisma.city.create({
      data: {
        name,
        icon,
        cityPrices: {
          create: price
        }
      },
      select: {
        id: true,
        name: true,
        icon: true,
        cityPrices: true
      }
    });

    Logger.log({ message: '새로운 도시를 추가했습니다.', name });

    return city;
  }
}
