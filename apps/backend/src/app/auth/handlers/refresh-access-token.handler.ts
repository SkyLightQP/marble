import { ForbiddenException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JsonWebTokenError } from '@nestjs/jwt';
import { RefreshAccessTokenCommand } from '@/app/auth/commands/refresh-access-token.command';
import { AuthTokenService } from '@/app/auth/services/auth-token.service';
import { ErrorCode } from '@/infrastructure/error/error-code';

@CommandHandler(RefreshAccessTokenCommand)
export class RefreshAccessTokenHandler implements ICommandHandler<RefreshAccessTokenCommand> {
  constructor(private readonly authTokenService: AuthTokenService) {}

  async execute({ args: { refreshToken } }: RefreshAccessTokenCommand) {
    try {
      const { accessToken: newAccessToken, sub } = await this.authTokenService.refreshAccessToken(refreshToken);
      Logger.log({ message: 'AccessToken을 연장했습니다.', userId: sub });
      return newAccessToken;
    } catch (e) {
      if (e instanceof JsonWebTokenError) throw new ForbiddenException(ErrorCode.PERMISSION_DENIED);
      throw e;
    }
  }
}
