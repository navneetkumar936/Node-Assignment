import Express from 'express';
import TeamController from '../controllers/team';
const teamController = new TeamController();
import userAuthentication from '../helper/auth';

export default Express
    .Router()

    .use(userAuthentication)
    .get('/', teamController.listTeam)
    .post('/:id', teamController.create)