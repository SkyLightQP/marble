import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SigninUserCommand } from '../commands/signin-user.command';
import { SignupUserCommand } from '../commands/signup-user.command';
import { SigninUserDto } from './dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/signup')
  async signup(@Body() body: SignupUserDto) {
    const command = new SignupUserCommand(body);
    return this.commandBus.execute(command);
  }

  @Post('/signin')
  async signin(@Body() body: SigninUserDto) {
    const command = new SigninUserCommand(body);
    return this.commandBus.execute(command);
  }
}
