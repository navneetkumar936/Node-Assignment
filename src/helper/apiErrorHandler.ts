const apiErrorhandler = (err, req, res, next) => {
	// console.log(err, "Error From Middleware.")
	if (err.isApiError) {
		res.status(err.code).json({
			code: err.code,
			message: err.message,
		});
		return;
	}
	if(err.message == 'Validation error'){
		res.status(502).json({
			code: 502,
			message: err.original.message,
		});
		return;
	}

	res.status(err.code || 500).json({
		code: err.code || 500,
		message: err.message,
	});
	return;
};

export default apiErrorhandler;
