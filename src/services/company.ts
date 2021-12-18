import company from '../database/models/company';
import { sequelize } from '../database';

class CompanyService {
    public async createCompany(body) {
        return await company.create(body);
    }

    public async companyById(id) {
        return await company.findAll({ where: { id } });
    }

    public async searchCompany(name) {
        return await company.findAndCountAll(
            {
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
                },
                order: [['createdAt', 'DESC']],
            });
    }
}

export default CompanyService;