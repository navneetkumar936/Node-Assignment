import team from '../database/models/team';
import company from '../database/models/company';

class TeamService {
    public async createTeam (body) {
        return await team.create(body);
    }

    public async teamList () {
        return await team.findAndCountAll(
            {
                include : [{
                    model : company
                }],
			    order: [['createdAt', 'DESC']],
            }
        );
    }
}

export default TeamService;