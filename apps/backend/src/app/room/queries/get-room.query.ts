import { IQuery } from '@nestjs/cqrs';

export class GetRoomQuery implements IQuery {
  constructor(
    readonly args: {
      readonly roomId: string;
    }
  ) {}
}
