import MarkdownIt from "markdown-it";
import { NextApiHandler } from "next";
import { Infer, is, object, optional, string, Struct } from "superstruct";

import { PATH_INDEX, PATH_SYSTEM } from "@/const";
import { prisma } from "@/libs/prisma";
import { returnError } from "@/misc/create-error-object";
import { returnEmpty, returnResponse } from "@/misc/create-response";

const handler: NextApiHandler = async (req, res) => {
  const p = req.query.path;
  const path = typeof p === 'object' ? p[0] : p ?? PATH_INDEX;
  if (path.startsWith(PATH_SYSTEM + '/') || path === PATH_SYSTEM) {
    return returnError(res, 'SYSTEM_PAGE', 400);
  }
        
  if (!prisma) {
    return returnError(res, 'INTERNAL_ERROR', 500, 'DB is not initiliazed.');
  }
  
  if (req.method !== 'GET') return returnError(res, 'INVALID_METHOD', 400);

  const page = await prisma.page.findUnique({
    where: { path },
  });
    
  if (!page || page.isDeleted) {
    returnError(res, 'PAGE_NOT_FOUND', 404);
  } else {
    res.send(page.body);
  }
};

export default handler;