
import Joi from 'joi';
import Response from '../assets/response';
import responseMessage from '../assets/responseMessage';
import CompanyService from '../services/company';
const companyService  = new CompanyService();
const { createCompany, companyById, searchCompany } = companyService;


class CompanyController {

    public async create(req, res, next) {
        try {
            const validationSchema = Joi.object({
                name: Joi.string().required().trim(),
                ceo: Joi.string().required().trim(),
                address: Joi.string().required().trim(),
                inception_date: Joi.date().iso().required(),
            });
            const validatedBody = await Joi.validate(req.body, validationSchema)
            const result = await createCompany(validatedBody);
            return res.json(new Response(result, responseMessage.COMPANY_CREATED));
        } catch (error) {
            next(error);
        }
    }

    public async companyDetail(req, res, next) {
        try {
            const result = await companyById(req.params.id);
            return res.json(new Response(result, responseMessage.COMPANY_DETAIL));
        } catch (error) {
            next(error);
        }
    }

    public async searchCompany(req, res, next) {
        try {
            const result = await searchCompany(req.query.name);
            return res.json(new Response(result, responseMessage.COMPANY_DETAIL));
        } catch (error) {
            next(error);
        }
    }
}

export default CompanyController;