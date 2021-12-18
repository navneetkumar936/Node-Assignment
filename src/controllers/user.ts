import Joi from 'joi';
import ApiError from '../helper/apiError';
import Response from '../assets/response';
import responseMessage from '../assets/responseMessage';
import { getToken } from '../helper/jwt';

export default class UserController {

    public async login(req, res, next) {
        try {
            const validationSchema = Joi.object({
                email: Joi.string().required().trim(),
                password: Joi.string().required().trim()
            });
            const validatedBody = await Joi.validate(req.body, validationSchema);
            const { email, password } = validatedBody;
            if ((email != process.env.USER_EMAIL) || (password != process.env.USER_PWD)) {
                throw ApiError.badRequest(responseMessage.INVALID_USER_CREDENTIAL);
            }
            const result = await getToken({ email, password });
            return res.json(new Response(result, responseMessage.LOGIN_SUCCESS));
        } catch (error) {
            next(error);
        }
    }

}