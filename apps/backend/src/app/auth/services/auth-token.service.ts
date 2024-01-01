import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { AuthTokenPayload } from '@/infrastructure/common/types/auth.type';
import { DatabaseService } from '@/infrastructure/database/database.service';
import { ErrorCode } from '@/infrastructure/error/error-code';

export interface RefreshAccessTokenReturn {
  readonly accessToken: string;
  readonly sub: string;
}

@Injectable()
export class AuthTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly prisma: DatabaseService
  ) {}

  private ACCESS_TOKEN_EXPIRE_DAY = 1;

  private REFRESH_TOKEN_EXPIRE_DAY = 14;

  generateAccessToken(payload: AuthTokenPayload): string {
    const secret = this.config.get('ACCESS_TOKEN_SECRET');
    const accessToken = this.jwtService.sign(
      {
        ...payload
      },
      {
        secret,
        expiresIn: `${this.ACCESS_TOKEN_EXPIRE_DAY}d`
      }
    );

    return accessToken;
  }

  async generateRefreshToken(payload: AuthTokenPayload): Promise<string> {
    const secret = this.config.get('REFRESH_TOKEN_SECRET');
    const refreshToken = this.jwtService.sign(
      {
        ...payload
      },
      {
        secret,
        expiresIn: `${this.REFRESH_TOKEN_EXPIRE_DAY}d`
      }
    );

    await this.prisma.refreshTokenWhiteList.create({
      data: {
        token: refreshToken,
        expiredAt: dayjs().add(this.REFRESH_TOKEN_EXPIRE_DAY, 'day').toDate()
      }
    });

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
    const refreshToken = await this.prisma.refreshTokenWhiteList.findFirst({
      where: {
        token,
        expiredAt: {
          gte: new Date()
        }
      }
    });

    return refreshToken !== null;
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
