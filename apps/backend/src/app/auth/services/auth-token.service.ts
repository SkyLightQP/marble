import { ErrorCode } from '@marble/common';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RedisClientType } from 'redis';
import { AuthTokenPayload } from '@/infrastructure/common/types/auth.type';

export interface RefreshAccessTokenReturn {
  readonly accessToken: string;
  readonly sub: string;
}

@Injectable()
export class AuthTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType
  ) {}

  generateAccessToken(payload: AuthTokenPayload): string {
    const secret = this.config.get('ACCESS_TOKEN_SECRET');
    const accessTokenExpireDay = this.config.get('ACCESS_TOKEN_EXPIRE_DAY');
    return this.jwtService.sign(
      {
        ...payload
      },
      {
        secret,
        expiresIn: `${accessTokenExpireDay}d`
      }
    );
  }

  async generateRefreshToken(payload: AuthTokenPayload): Promise<string> {
    const secret = this.config.get('REFRESH_TOKEN_SECRET');
    const refreshTokenExpireDay = this.config.get('REFRESH_TOKEN_EXPIRE_DAY');
    const refreshToken = this.jwtService.sign(
      {
        ...payload
      },
      {
        secret,
        expiresIn: `${refreshTokenExpireDay}d`
      }
    );

    const whitelistTTL = refreshTokenExpireDay * 24 * 60 * 60;
    await this.redis.set(`refreshToken:${refreshToken}`, payload.sub, { EX: whitelistTTL, NX: true });

    return refreshToken;
  }

  verifyAccessToken(token: string): AuthTokenPayload {
    const secret = this.config.get('ACCESS_TOKEN_SECRET');
    const payload = this.jwtService.verify(token, {
      secret
    });

    return { sub: payload.sub, id: payload.id };
  }

  verifyRefreshToken(token: string): AuthTokenPayload {
    const secret = this.config.get('REFRESH_TOKEN_SECRET');
    const payload = this.jwtService.verify(token, {
      secret
    });

    return { sub: payload.sub, id: payload.id };
  }

  async isRefreshTokenInWhiteList(token: string): Promise<boolean> {
    const isInRedis = await this.redis.exists(`refreshToken:${token}`);
    return isInRedis === 1;
  }

  async refreshAccessToken(refreshToken: string): Promise<RefreshAccessTokenReturn> {
    if (!(await this.isRefreshTokenInWhiteList(refreshToken))) {
      throw new ForbiddenException(ErrorCode.PERMISSION_DENIED);
    }

    const payload = this.verifyRefreshToken(refreshToken);
    const accessToken = this.generateAccessToken(payload);

    return {
      accessToken,
      sub: payload.sub
    };
  }
}
