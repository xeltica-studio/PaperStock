import { Page } from '@prisma/client';

/**
 * API戻り値 ページ
 */
export type ApiPage = Page & {
  html: string;
}
