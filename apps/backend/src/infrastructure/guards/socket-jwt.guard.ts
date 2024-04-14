import { ErrorCode } from '@marble/common';
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { AuthTokenService } from '@/app/auth/services/auth-token.service';

@Injectable()
export class SocketJwtGuard implements CanActivate {
  constructor(private readonly authTokenService: AuthTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const authHeader = context.switchToWs().getClient().handshake.query.token;
    const token = authHeader ?? '';

    try {
      const decode = this.authTokenService.verifyAccessToken(token);
      client.user = decode;
    } catch (e) {
      if (!(e instanceof JsonWebTokenError)) Logger.error(e);
      throw new WsException(ErrorCode.PERMISSION_DENIED);
    }

    return true;
  }
}
