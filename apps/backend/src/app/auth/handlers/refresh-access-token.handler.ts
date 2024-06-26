import { ErrorCode } from '@marble/common';
import { ForbiddenException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JsonWebTokenError } from '@nestjs/jwt';
import { RefreshAccessTokenCommand } from '@/app/auth/commands/refresh-access-token.command';
import { AuthTokenService, RefreshAccessTokenReturn } from '@/app/auth/services/auth-token.service';

@CommandHandler(RefreshAccessTokenCommand)
export class RefreshAccessTokenHandler implements ICommandHandler<RefreshAccessTokenCommand> {
  constructor(private readonly authTokenService: AuthTokenService) {}

  async execute({ args: { refreshToken } }: RefreshAccessTokenCommand): Promise<RefreshAccessTokenReturn> {
    try {
      const { accessToken: newAccessToken, sub } = await this.authTokenService.refreshAccessToken(refreshToken);
      Logger.log({ message: 'AccessToken을 연장했습니다.', userId: sub });
      return { accessToken: newAccessToken, sub };
    } catch (e) {
      if (e instanceof JsonWebTokenError) throw new ForbiddenException(ErrorCode.PERMISSION_DENIED);
      throw e;
    }
  }
}
