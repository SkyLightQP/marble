import { IQuery } from '@nestjs/cqrs';

export class GetCityByIdQuery implements IQuery {
  constructor(
    readonly args: {
      readonly id: number;
    }
  ) {}
}
