export function buildResponse (res: object = {}) {
	return {
		ok: true,
		...res
	};
}

export function buildErrorResponse (message: string, statusCode?: number) {
	return {
		ok: false,
		error: message,
		statusCode: statusCode || 500
	};
}
