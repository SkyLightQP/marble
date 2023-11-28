import { IQuery } from '@nestjs/cqrs';

export class GetUsersQuery implements IQuery {
  constructor(readonly args?: { limit: number; offset: number }) {}
}
