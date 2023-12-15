const errorMessages: Record<string, string> = {
  USER_NOT_FOUND: '아이디 또는 비밀번호가 올바르지 않습니다.',
  USER_ALREADY_EXISTS: '이미 존재하는 계정입니다.'
} as const;

export function getErrorMessage(code: string): string {
  return errorMessages[code] || '알 수 없는 오류가 발생했습니다.';
}
