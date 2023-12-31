import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(WsException, HttpException)
export class WebsocketExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException | WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();

    if (exception instanceof WsException) {
      client.emit('exception', exception.getError());
    } else {
      client.emit('exception', exception.getResponse());
    }
  }
}
