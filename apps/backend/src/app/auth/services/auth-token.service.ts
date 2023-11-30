import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

interface TokenPayload {
  readonly id: string;
}

@Injectable()
export class AuthTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) {}

  generateAccessToken(sub: string, payload: TokenPayload) {
    const secret = this.config.get('ACCESS_TOKEN_SECRET');
    const accessToken = this.jwtService.sign(
      {
        sub,
        ...payload
      },
      {
        secret,
        expiresIn: '1d'
      }
    );

    return accessToken;
  }

  generateRefreshToken(sub: string, payload: TokenPayload) {
    const secret = this.config.get('REFRESH_TOKEN_SECRET');
    const refreshToken = this.jwtService.sign(
      {
        sub,
        ...payload
      },
      {
        secret,
        expiresIn: '14d'
      }
    );

    return refreshToken;
  }
}
