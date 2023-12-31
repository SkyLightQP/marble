interface ErrorCodeType {
  readonly code: Uppercase<string>;
  readonly message: string;
}

export const ErrorCode: Record<Uppercase<string>, ErrorCodeType> = {
  PLAYER_ALREADY_EXISTS: {
    code: 'PLAYER_ALREADY_EXISTS',
    message: '이미 존재하는 플레이어입니다.'
  },
  PLAYER_NOT_FOUND: {
    code: 'PLAYER_NOT_FOUND',
    message: '플레이어를 찾을 수 없습니다.'
  },
  ROOM_NOT_FOUND: {
    code: 'ROOM_NOT_FOUND',
    message: '방을 찾을 수 없습니다.'
  },
  CITY_NOT_FOUND: {
    code: 'CITY_NOT_FOUND',
    message: '도시를 찾을 수 없습니다.'
  },
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    message: '사용자를 찾을 수 없습니다.'
  },
  USER_ALREADY_EXISTS: {
    code: 'USER_ALREADY_EXISTS',
    message: '이미 존재하는 사용자입니다.'
  },
  BAD_REQUEST: {
    code: 'BAD_REQUEST',
    message: '잘못된 요청입니다.'
  },
  PERMISSION_DENIED: {
    code: 'PERMISSION_DENIED',
    message: '권한이 없습니다.'
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: '알 수 없는 오류입니다.'
  }
} as const;
