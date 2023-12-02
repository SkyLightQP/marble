import { DatabaseService } from '@infrastructure/database/database.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly prisma: DatabaseService) {}

  @Get('/')
  async getTestUsers() {
    return this.prisma.user.findMany();
  }
}
