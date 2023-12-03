import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignupUserCommand } from '../commands/signup-user.command';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/signup')
  async signup(@Body() body: SignupDto) {
    const command = new SignupUserCommand(body);
    return this.commandBus.execute(command);
  }
}
