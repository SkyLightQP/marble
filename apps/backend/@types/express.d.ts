import { AuthTokenPayload } from '@infrastructure/common/types/auth.type';

declare global {
  namespace Express {
    interface Request {
      user: AuthTokenPayload;
    }
  }
}
