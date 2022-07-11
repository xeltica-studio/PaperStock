import { NextApiResponse } from 'next';

import { ApiResponseObject } from "../types/api-object";

export const createResponse = (response: any): ApiResponseObject => ({
  ok: true,
  response,
});

export const returnResponse = (res: NextApiResponse, response: any) => {
  res.status(200);
  res.json(createResponse(response));
};

export const returnEmpty = (res: NextApiResponse) => {
  res.status(204);
};
