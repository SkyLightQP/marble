import { IQuery } from '@nestjs/cqrs';

export class GetCitiesGroupByPositionQuery implements IQuery {
  constructor(
    readonly args: {
      readonly limit?: number;
      readonly offset?: number;
    }
  ) {}
}
