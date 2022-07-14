import { Page } from "@prisma/client";

/**
 * API戻り値 ページ一覧の項目
 */
export type ApiPageListItem = Pick<Page, 'id' | 'title' | 'path'>;
