import MarkdownIt from "markdown-it";
import { NextApiHandler } from "next";
import { is, object, optional, string } from "superstruct";

import { PATH_INDEX, PATH_SYSTEM } from "@/const";
import { prisma } from "@/libs/prisma";
import { returnError } from "@/misc/create-error-object";
import { returnEmpty, returnResponse } from "@/misc/create-response";

const md = MarkdownIt();

const PostBody = object({
  title: string(),
  body: string(),
});

const PutBody = object({
  title: string(),
  body: string(),
  newPath: optional(string()),
});

const handler: NextApiHandler = async (req, res) => {
  const p = req.query.path;
  const path = typeof p === 'object' ? p[0] : p ?? PATH_INDEX;
  if (path.startsWith(PATH_SYSTEM + '/') || path === PATH_SYSTEM) {
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
      if (!is(body, PostBody)) {
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
      if (!is(body, PutBody)) {
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