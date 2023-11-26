import { IQuery } from '@nestjs/cqrs';

export class GetUserByUidQuery implements IQuery {
  constructor(
    readonly args: {
      readonly uid: string;
    }
  ) {}
}
