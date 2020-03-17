export class ApiError extends Error {
	constructor (message: string, public errorId: string) {
		super(message);
		this.name = "ApiError";
	}
}

export const ErrorId = {
	invalidParam: "INVALID_PARAM",
	notAuthorized: "NOT_AUTHORIZED",
	unknown: "UNKNOWN",
	noSuchUser: "NO_SUCH_USER",
	noSuchNote: "NO_SUCH_NOTE",
	failedToAuthenticate: "FAILED_TO_AUTHENTICATE",
	duplicated: "DUPLICATED"
};
