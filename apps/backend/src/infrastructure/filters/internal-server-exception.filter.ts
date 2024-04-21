import { ErrorCode } from '@marble/common';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class InternalServerExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (!(exception instanceof HttpException)) {
      res.status(500).json(ErrorCode.INTERNAL_SERVER_ERROR);
      throw exception;
    } else {
      res.status(exception.getStatus()).json(exception.getResponse());
    }
  }
}
