import MarkdownIt from "markdown-it";
import { NextApiHandler } from "next";
import { returnError } from "../../../../misc/create-error-object";
import { returnResponse } from "../../../../misc/create-response";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    returnError(res, 'INVALID_METHOD', 400);
    return;
  }

  const p = req.query.path;
  const path = typeof p === 'object' ? p[0] : p ?? '';

  if (path.startsWith('/s/' || path === '/s')) {
    returnError(res, 'SYSTEM_PAGE', 400);
    return;
  }

  // TODO: 実装
  returnError(res, 'PAGE_NOT_FOUND', 404);
};

export default handler;