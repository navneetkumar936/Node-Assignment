
import Joi from 'joi';
import ApiError from '../helper/apiError';
import Response from '../assets/response';
import responseMessage from '../assets/responseMessage';
import CompanyService from '../services/company';
import TeamService from '../services/team';
const teamService  = new TeamService();
const companyService  = new CompanyService();
const { createTeam, teamList } = teamService;
const { companyById } = companyService;


class TeamController {

    public async create(req, res, next) {
        try {
            const validationSchema = Joi.object({
                lead_name: Joi.string().required().trim()
            });
            let validatedBody = await Joi.validate(req.body, validationSchema);
            const company = await companyById(req.params.id);
            if(!company || !company.length){
                throw ApiError.badRequest(responseMessage.COMPANY_NOT_FOUND);
            }
            validatedBody = Object.assign(validatedBody, { companyId : req.params.id });
            const result = await createTeam(validatedBody);
            return res.json(new Response(result, responseMessage.TEAM_CREATED));
        } catch (error) {
            next(error);
        }
    }

    public async listTeam(req, res, next) {
        try {
            const result = await teamList();
            return res.json(new Response(result, responseMessage.TEAM_DETAIL));
        } catch (error) {
            next(error);
        }
    }
}

export default TeamController;