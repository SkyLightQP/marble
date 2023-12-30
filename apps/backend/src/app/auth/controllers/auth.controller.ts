import { GetUserByUidReturn } from '@app/user/handlers/get-user-by-uid.handler';
import { GetUserByUidQuery } from '@app/user/queries/get-user-by-uid.query';
import { AuthTokenPayload } from '@infrastructure/common/types/auth.type';
import { JwtGuard } from '@infrastructure/guards/jwt.guard';
import { Controller, Req, Res, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { Request, Response } from 'express';
import { TypedBody, TypedRoute } from '@nestia/core';
import { RefreshAccessTokenCommand } from '../commands/refresh-access-token.command';
import { SigninUserCommand } from '../commands/signin-user.command';
import { SignoutUserCommand } from '../commands/signout-user.command';
import { SignupUserCommand } from '../commands/signup-user.command';
import { SigninUserReturn } from '../handlers/signin-user.handler';
import { SignupUserReturn } from '../handlers/signup-user.handler';
import { RefreshAccessTokenReturn } from '../services/auth-token.service';
import { SigninUserDto } from './dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @TypedRoute.Post('/signup')
  async signup(
    @TypedBody() body: SignupUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<SignupUserReturn> {
    const command = new SignupUserCommand(body);
    const result = await this.commandBus.execute<SignupUserCommand, SignupUserReturn>(command);
    response.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true
    });
    return result;
  }

  @TypedRoute.Post('/signin')
  async signin(
    @TypedBody() body: SigninUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<SigninUserReturn> {
    const command = new SigninUserCommand(body);
    const result = await this.commandBus.execute(command);
    response.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true
    });
    return result;
  }

  @TypedRoute.Post('/refresh')
  async refresh(@Req() request: Request): Promise<RefreshAccessTokenReturn> {
    const command = new RefreshAccessTokenCommand({ refreshToken: request.cookies.refreshToken });
    return this.commandBus.execute(command);
  }

  @TypedRoute.Get('/me')
  @UseGuards(JwtGuard)
  async me(@Req() request: Request & { user: AuthTokenPayload }): Promise<GetUserByUidReturn> {
    const userId = request.user.sub;
    const query = new GetUserByUidQuery({ uid: userId });
    return this.queryBus.execute(query);
  }

  @TypedRoute.Delete('/signout')
  @UseGuards(JwtGuard)
  async signout(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<boolean> {
    const command = new SignoutUserCommand({ refreshToken: request.cookies.refreshToken });
    await this.commandBus.execute(command);
    response.clearCookie('refreshToken');
    return true;
  }
}
