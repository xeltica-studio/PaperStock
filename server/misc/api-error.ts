export class ApiError extends Error {
	constructor (message: string, public errorId: string) {
		super(message);
		this.name = "ApiError";
	}
}

export const ErrorId = {
	invalidParam: "INVALID_PARAM",
	notAuthorized: "NOT_AUTHORIZED",
	unknown: "UNKNOWN"
};
