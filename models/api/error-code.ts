/**
 * エラーコード 配列
 */
export const apiErrorCodes = [
	'INTERNAL_ERROR',
	'INVALID_METHOD',
	'INVALID_PARAMS',
	'PERMISSION_DENIED',
	'TOKEN_REQUIRED',
	'TOKEN_EXPIRED',
	'SYSTEM_PAGE',
	'PAGE_NOT_FOUND',
	'PAGE_ALREADY_EXISTS',
	'USER_NOT_FOUND',
	'USER_ALREADY_EXISTS',
	'PASSWORD_MISMATCH',
] as const;

/**
 * API エラーコード
 */
export type ApiErrorCode = typeof apiErrorCodes[number];
