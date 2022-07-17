export const PATH_INDEX = 'index';
export const PATH_SYSTEM = 's';
export const PATH_API = 'api';
export const PATH_API_V1 = 'api/v1';

/**
 * ユーザー名の正規表現。
 * 3文字以上32文字以内の、英数字およびアンダースコアのみ許容する。
 */
export const REGEX_NAME = /^[A-Za-z0-9_]{3,32}$/;
