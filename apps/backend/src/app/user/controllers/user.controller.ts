import { Controller, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtGuard } from '@infrastructure/guards/jwt.guard';
import { TypedParam, TypedRoute } from '@nestia/core';
import { GetUserByUidReturn } from '@app/user/handlers/get-user-by-uid.handler';
import { GetUserByUidQuery } from '@app/user/queries/get-user-by-uid.query';

@Controller('user')
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtGuard)
  @TypedRoute.Get('/:userId')
  async getUserByUid(@TypedParam('userId') uid: string): Promise<GetUserByUidReturn> {
    return this.queryBus.execute(new GetUserByUidQuery({ uid }));
  }
}
