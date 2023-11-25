import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './infrastructure/database/database.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: DatabaseService) {}

  @Get('/')
  async getTestUsers() {
    return this.prisma.user.findMany();
  }
}
