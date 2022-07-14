import { ApiErrorCode } from "../api/error-code";
import { ApiErrorObject } from "../api/object";

/**
 * データまたはエラーを表すオブジェクト
 */
export type DataOrError<TData = null> = {
  data?: TData;
  error?: ApiErrorObject;
};
