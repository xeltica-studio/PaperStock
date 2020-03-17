import { ErrorId } from "./api-error";

export function buildResponse (res: object = {}) {
	return {
		ok: true,
		...res
	};
}

export function buildErrorResponse (message: string, statusCode?: number, errorId?: string) {
	return {
		ok: false,
		error: message,
		errorId: errorId || ErrorId.unknown,
		statusCode: statusCode || 500
	};
}
