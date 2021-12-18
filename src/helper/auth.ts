'use strict';

import { verifyToken } from './jwt';
import ApiError from './apiError';
import responseMessage from '../assets/responseMessage';

export default async (req, res, next) => {
	try {
		const auth = req.headers['authorization'];
		if (!auth || (auth && auth.indexOf('Bearer') === -1)) {
			throw ApiError.unauthorized(responseMessage.INVALID_TOKEN);
		}
		const userData:any = await verifyToken(req.headers['authorization'].replace('Bearer', '').trim());
		req.userInfo = userData;
		req.userInfo.data.userId = userData.data.id;
		req.userInfo.data.userRole = userData.data.role;
		next();
	} catch (err) {
		next(err);
	}
};
