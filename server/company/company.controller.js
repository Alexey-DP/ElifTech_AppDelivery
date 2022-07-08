import CompanyService from './company.service.js';

class CompanyController {

    async createCompany(req, res) {
        try {
            const company = await CompanyService.sendCompany(req.body);
            res.json(company);
        } catch(err) {
            res.status(500).json(err.message);
        }
    }

    async getAll(req, res) {
        try {
            const company = await CompanyService.getAll();
            return res.json(company);
        } catch(err) {
            res.status(500).json(err.message);
        }
    }

    async getOne(req, res) {
        try {
            const company = await CompanyService.getOne(req.params.id);
            return res.json(company);
        } catch(err) {
            res.status(500).json(err.message);
        }
    }
}

export default new CompanyController();