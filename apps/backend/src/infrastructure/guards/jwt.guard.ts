import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { AuthTokenService } from '@/app/auth/services/auth-token.service';
import { ErrorCode } from '@/infrastructure/error/error-code';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly authTokenService: AuthTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : '';

    try {
      const decode = this.authTokenService.verifyAccessToken(token);
      request.user = decode;
    } catch (e) {
      if (e instanceof JsonWebTokenError) throw new UnauthorizedException(ErrorCode.PERMISSION_DENIED);
      Logger.error(e);
    }

    return true;
  }
}
