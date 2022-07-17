import { NextApiResponse } from 'next';

import { ApiErrorCode } from '@/models/api/error-code';
import { ApiObject } from '@/models/api/object';

export const createErrorObject = (errorCode: ApiErrorCode, statusCode: number, additionalInfo?: string): ApiObject => ({
	ok: false,
	errorCode,
	statusCode,
	additionalInfo
});

export const returnError = (res: NextApiResponse, errorCode: ApiErrorCode, statusCode: number, additionalInfo?: string) => {
	res.status(statusCode);
	res.json(createErrorObject(errorCode, statusCode, additionalInfo));
};
