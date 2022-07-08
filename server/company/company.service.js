import Companys from '../models/company.model.js';

class CompanyService {
    async sendCompany(order) {
        const createCompany = await Companys.create(order);
        return createCompany;
    }

    async getAll() {
            const company = await Companys.find();
            return company;
    }

    async getOne(id) {
            if(!id) {
                throw new Error('ID not finded');
            }
            const company = await Companys.findById(id);
            return company;
    }

}

export default new CompanyService();