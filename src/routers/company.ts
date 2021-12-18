import Express from 'express';
import CompanyController from '../controllers/company';
const companyController = new CompanyController();
import userAuthentication from '../helper/auth';

export default Express
    .Router()

    .use(userAuthentication)
    .post('/', companyController.create)
    .get('/:id', companyController.companyDetail)
    .get('/', companyController.searchCompany)
