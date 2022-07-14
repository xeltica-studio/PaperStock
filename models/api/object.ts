import { ApiErrorCode } from "@/models/api/error-code";

/**
 * API オブジェクト
 */
export type ApiObject = ApiErrorObject | ApiResponseObject;

/**
 * API エラーオブジェクト
 */
export type ApiErrorObject = {
  ok: false;
  errorCode: ApiErrorCode;
  statusCode: number;
  additionalInfo?: string;
};

/**
 * API レスポンスオブジェクト
 */
export type ApiResponseObject = {
  ok: true;
  response: any;
};
