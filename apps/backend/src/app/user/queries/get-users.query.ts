import { IQuery } from '@nestjs/cqrs';

export class GetUsersQuery implements IQuery {
  constructor(readonly args?: { readonly limit: number; readonly offset: number }) {}
}
