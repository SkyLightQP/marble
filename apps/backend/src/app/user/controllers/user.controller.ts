import { TypedParam, TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserByUidReturn } from '@/app/user/handlers/get-user-by-uid.handler';
import { GetUserByUidQuery } from '@/app/user/queries/get-user-by-uid.query';
import { JwtGuard } from '@/infrastructure/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtGuard)
  @TypedRoute.Get('/:userId')
  async getUserByUid(@TypedParam('userId') uid: string): Promise<GetUserByUidReturn> {
    return this.queryBus.execute(new GetUserByUidQuery({ uid }));
  }
}
