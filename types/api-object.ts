export type ApiErrorCode = 
  | 'SYSTEM_PAGE'     // システムページである
  | 'TOKEN_REQUIRED'  // トークンが必須である
  | 'TOKEN_EXPIRED'   // トークンが期限切れである
  | 'PAGE_NOT_FOUND'  // ページが存在しない
  | 'INTERNAL_ERROR'  // 内部エラー
  | 'INVALID_METHOD'  // メソッドが不正である
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
