import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import type { Request, Response } from 'express';
import { RefreshAccessTokenCommand } from '../commands/refresh-access-token.command';
import { SigninUserCommand } from '../commands/signin-user.command';
import { SignupUserCommand } from '../commands/signup-user.command';
import { SignupUserReturn } from '../handlers/signup-user.handler';
import { SigninUserDto } from './dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/signup')
  async signup(@Body() body: SignupUserDto, @Res({ passthrough: true }) response: Response) {
    const command = new SignupUserCommand(body);
    const result = await this.commandBus.execute<SignupUserCommand, SignupUserReturn>(command);
    response.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true
    });
    return result;
  }

  @Post('/signin')
  async signin(@Body() body: SigninUserDto, @Res({ passthrough: true }) response: Response) {
    const command = new SigninUserCommand(body);
    const result = await this.commandBus.execute(command);
    response.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true
    });
    return result;
  }

  @Post('/refresh')
  async refresh(@Req() request: Request) {
    const command = new RefreshAccessTokenCommand({ refreshToken: request.cookies.refreshToken });
    return this.commandBus.execute(command);
  }
}
