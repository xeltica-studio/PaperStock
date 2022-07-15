import { NextApiResponse } from 'next';

import { ApiObject } from '@/models/api/object';

export const createResponse = (response: any): ApiObject => ({
  ok: true,
  response,
});

export const returnResponse = (res: NextApiResponse, response: any) => {
  res.status(200);
  res.json(createResponse(response));
};

export const returnEmpty = (res: NextApiResponse) => {
  res.status(204);
  res.json(createResponse(null));
};
