import { NextApiHandler } from "next";

import { prisma } from "@/libs/prisma";
import { returnError } from "@/misc/create-error-object";
import { isSystemPath, isValidPath } from "@/misc/validate-path";
import { sanitizePath } from "@/misc/sanitize-path";
import { getPathFromQuery } from "@/misc/get-path-from-query";

const handler: NextApiHandler = async (req, res) => {
  const path = sanitizePath(getPathFromQuery(req.query));
  if (!isValidPath(path)) {
    return returnError(res, 'INVALID_PARAMS', 400, 'Path is invalid');
  }
  if (isSystemPath(path)) {
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