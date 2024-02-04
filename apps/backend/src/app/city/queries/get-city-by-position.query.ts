import { IQuery } from '@nestjs/cqrs';

export class GetCityByPositionQuery implements IQuery {
  constructor(
    readonly args: {
      readonly position: number;
    }
  ) {}
}
