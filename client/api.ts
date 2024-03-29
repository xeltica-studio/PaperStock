import { ServerSetting } from '@prisma/client';

import * as http from '@/client/http';
import { ApiPage } from '@/models/api/page';
import { ApiPageListItem } from '@/models/api/page-list-item';
import { CreatePageBody, UpdatePageBody } from '@/pages/api/v1/page/[[...path]]';
import { Meta } from '@/models/api/meta';
import { ApiSigninResponse } from '@/models/api/signin-response';

/**
 * サーバー設定を取得します。
 */
export const readMeta = () => {
	return http.get<Meta>('meta');
};

/**
 * サーバー設定を取得します。
 */
export const readServerSetting = () => {
	return http.get<ServerSetting>('server-setting');
};

/**
 * サーバー設定を更新します。
 */
export const updateServerSetting = () => {
	return http.put<void>('server-setting');
};

/**
 * ページ一覧を取得します。
 */
export const readPages = () => {
	return http.get<ApiPageListItem[]>('page/list');
};

/**
 * ページを取得します。
 */
export const readPage = (path: string) => {
	return http.get<ApiPage>('page/' + path);
};

/**
 * ページを作成します。
 */
export const createPage = (path: string, body: CreatePageBody) => {
	return http.post<void>('page/' + path, body);
};

/**
 * ページを更新します。
 */
export const updatePage = (path: string, body: UpdatePageBody) => {
	return http.put<void>('page/' + path, body);
};

/**
 * サインアップ
 */
export const signup = (name: string, password: string) => {
	return http.post<ApiSigninResponse>('signup', {name, password});
};

/**
 * サインイン
 */
export const signin = (name: string, password: string) => {
	return http.post<ApiSigninResponse>('signin', {name, password});
};
