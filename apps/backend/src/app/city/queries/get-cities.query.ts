import { IQuery } from '@nestjs/cqrs';

export class GetCitiesQuery implements IQuery {
  constructor(
    readonly args: {
      readonly limit?: number;
      readonly offset?: number;
    }
  ) {}
}
