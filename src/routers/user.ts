import Express from 'express';
import UserController from '../controllers/user';
const userController = new UserController();

export default Express
    .Router()

    .post('/', userController.login)