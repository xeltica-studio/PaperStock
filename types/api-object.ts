import { Page } from "@prisma/client";

export type ApiErrorCode = 
  | 'SYSTEM_PAGE'         // システムページである
  | 'TOKEN_REQUIRED'      // トークンが必須である
  | 'TOKEN_EXPIRED'       // トークンが期限切れである
  | 'PAGE_NOT_FOUND'      // ページが存在しない
  | 'PAGE_ALREADY_EXISTS' // ページが既に存在する
  | 'INTERNAL_ERROR'      // 内部エラー
  | 'INVALID_METHOD'      // メソッドが不正である
  | 'PERMISSION_DENIED'   // 権限が無い
  | 'INVALID_PARAMS'      // 引数がおかしい
  ;

export type ApiResponseObject = {
  ok: true;
  response: any;
};

export type ApiErrorObject = {
  ok: false;
  errorCode: ApiErrorCode;
  statusCode: number;
  additionalInfo?: string;
}

export type ApiObject = ApiErrorObject | ApiResponseObject;

export interface ApiPage extends Page {
  html: string;
};