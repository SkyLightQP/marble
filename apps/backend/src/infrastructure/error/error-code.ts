interface ErrorCodeType {
  readonly code: Uppercase<string>;
  readonly message: string;
}

export const ErrorCode: Record<Uppercase<string>, ErrorCodeType> = {
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    message: '사용자를 찾을 수 없습니다.'
  },
  USER_ALREADY_EXISTS: {
    code: 'USER_ALREADY_EXISTS',
    message: '이미 존재하는 사용자입니다.'
  }
} as const;
