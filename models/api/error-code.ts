/**
 * エラーコード 配列
 */
export const apiErrorCodes = [
  'SYSTEM_PAGE',
  'TOKEN_REQUIRED',
  'TOKEN_EXPIRED',
  'PAGE_NOT_FOUND',
  'PAGE_ALREADY_EXISTS',
  'INTERNAL_ERROR',
  'INVALID_METHOD',
  'PERMISSION_DENIED',
  'INVALID_PARAMS',
] as const;

/**
 * API エラーコード
 */
export type ApiErrorCode = typeof apiErrorCodes[number];
