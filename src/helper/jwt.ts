import jwt from 'jsonwebtoken';

const getToken = async rawData => {
	try {
		if (typeof rawData === 'object' && !Array.isArray(rawData)) {
			let jwtData = {};
			jwtData['exp'] = Number(
				Math.floor(Date.now() / 1000) + (60 * 60 * 60 * 60 * 60 * 60 * 60 * 60 * 60 * 2)
			);
			jwtData['data'] = rawData;

			const token = await jwt.sign(
				jwtData,
				process.env.JWT_SECRET || 'you@talking@to@me?',
				{ algorithm: process.env.JWT_ALGO || 'HS256' }
			);
			return token;
		}
		throw new Error('Data not found');
	} catch (err) {
		return err;
	}
};

const verifyToken = token => {
	return new Promise((resolve, reject) => {
		try {
			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET,
				{ algorithm: process.env.JWT_ALGO }
			);
			resolve(decoded);
		} catch (err) {
			reject({ message: "Unauthorized access" })
		}
	});
};

export { getToken, verifyToken }