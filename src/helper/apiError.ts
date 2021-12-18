import error from './error';

class ApiError extends Error {
    public code : number;
    public isApiError : boolean = true;

	constructor(code, message) {
		super(message);
		this.code = code;
		this.message = message ? message : error[code] || 'internal server error';
		this.isApiError = true;
		console.log(this.message);
	}

	static unauthorized(msg) {
		return new ApiError(401, msg);
	}
	static badRequest(msg) {
		return new ApiError(400, msg);
	}
	static internal(msg) {
		return new ApiError(500, msg);
	}
	static notFound(msg) {
		return new ApiError(404, msg);
	}
}

export default ApiError;
