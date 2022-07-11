import { NextApiResponse } from "next";
import { ApiErrorCode, ApiErrorObject } from "../types/api-object";

export const createErrorObject = (errorCode: ApiErrorCode, statusCode: number, additionalInfo?: string): ApiErrorObject => ({
  ok: false,
  errorCode,
  statusCode,
  additionalInfo
});

export const returnError = <T>(res: NextApiResponse, errorCode: ApiErrorCode, statusCode: number, additionalInfo?: string) => {
  res.status(statusCode);
  res.json(createErrorObject(errorCode, statusCode, additionalInfo));
};
