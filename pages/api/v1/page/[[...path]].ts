import MarkdownIt from 'markdown-it';
import { NextApiHandler } from 'next';
import { Infer, is, object, optional, string } from 'superstruct';

import { prisma } from '@/libs/prisma';
import { returnError } from '@/misc/create-error-object';
import { returnEmpty, returnResponse } from '@/misc/create-response';
import { sanitizePath } from '@/misc/sanitize-path';
import { isSystemPath, isValidPath } from '@/misc/validate-path';
import { getPathFromQuery } from '@/misc/get-path-from-query';

const md = MarkdownIt();

export const CreatePageBodyStruct = object({
	title: string(),
	body: string(),
});

export const UpdatePageBodyStruct = object({
	title: string(),
	body: string(),
	newPath: optional(string()),
});

export type CreatePageBody = Infer<typeof CreatePageBodyStruct>;

export type UpdatePageBody = Infer<typeof UpdatePageBodyStruct>;

const handler: NextApiHandler = async (req, res) => {
	const path = sanitizePath(getPathFromQuery(req.query));
	if (!isValidPath(path)) {
		return returnError(res, 'INVALID_PARAMS', 400, 'path');
	}
	if (isSystemPath(path)) {
		return returnError(res, 'SYSTEM_PAGE', 400);
	}
        
	if (!prisma) {
		return returnError(res, 'INTERNAL_ERROR', 500, 'DB is not initiliazed.');
	}

	const body = req.body;

	switch (req.method) {
		case 'GET': {
			// ページを取得する。
			const page = await prisma.page.findUnique({
				where: { path },
			});
    
			if (!page || page.isDeleted) {
				returnError(res, 'PAGE_NOT_FOUND', 404);
			} else {
				returnResponse(res, {
					...page,
					html: md.render(page.body),
				});
			}
			break;
		}
		case 'POST': {
			// ページを作成する。
			if (!is(body, CreatePageBodyStruct)) {
				return returnError(res, 'INVALID_PARAMS', 400);
			}
			const page = await prisma.page.findUnique({
				where: { path },
			});
			if (page) {
				return returnError(res, 'PAGE_ALREADY_EXISTS', 400);
			}
			await prisma.page.create({
				data: {
					title: body.title,
					body: body.body,
					path,
				}
			}).then(() => {
				returnEmpty(res);
			}).catch(e => {
				returnError(res, 'INTERNAL_ERROR', 500, e);
			});
			break;
		}
		case 'PUT': {
			// ページを更新する。
			if (!is(body, UpdatePageBodyStruct)) {
				return returnError(res, 'INVALID_PARAMS', 400);
			}
			const page = await prisma.page.findUnique({
				where: { path },
			});
			if (!page) {
				return returnError(res, 'PAGE_NOT_FOUND', 404);
			}
			await prisma.page.update({
				where: {
					path
				},
				data: {
					title: body.title,
					body: body.body,
					path: body.newPath ? body.newPath : path,
				}
			}).then(() => {
				returnEmpty(res);
			}).catch(e => {
				returnError(res, 'INTERNAL_ERROR', 500, e);
			});
			break;
		}
		case 'DELETE': {
			// ページを削除する。
			// TODO 実装
			returnError(res, 'PERMISSION_DENIED', 403);
			break;
		}
		default: {
			returnError(res, 'INVALID_METHOD', 400);
			break;
		}
	}

  
};

export default handler;