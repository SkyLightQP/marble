const errorMessages: Record<string, string> = {
  PLAYER_ALREADY_EXISTS: '이미 존재하는 플레이어입니다.',
  PLAYER_NOT_FOUND: '플레이어를 찾을 수 없습니다.',
  ROOM_NOT_FOUND: '방을 찾을 수 없습니다.',
  CITY_NOT_FOUND: '도시를 찾을 수 없습니다.',
  USER_NOT_FOUND: '아이디 또는 비밀번호가 올바르지 않습니다.',
  USER_ALREADY_EXISTS: '이미 존재하는 계정입니다.',
  BAD_REQUEST: '잘못된 요청입니다.',
  PERMISSION_DENIED: '권한이 없습니다.',
  INTERNAL_SERVER_ERROR: '알 수 없는 오류입니다.'
} as const;

export function getErrorMessage(code: string): string {
  return errorMessages[code] || '알 수 없는 오류가 발생했습니다.';
}
