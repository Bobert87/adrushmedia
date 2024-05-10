const carModel = require('../../models/supply/company');

class Company {
    constructor(){
        this.companyModel = new carModel();
    }

    async getAll(req, res){
        try{
            const companies = await this.companyModel.getAll();
            res.json(companies);
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async getById(req, res){
        try{
            const id = req.params.id;
            const company = await this.companyModel.getById(id);
            res.json(company);
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async create(req, res){
        try{
            const company = req.body;
            const createdCompany = await this.companyModel.create(company);
            res.json(createdCompany);
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async update(req, res){
        try{
            const id = req.params.id;
            const company = req.body;
            const updatedCompany = await this.companyModel.update(id, company);
            res.json(updatedCompany);
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async delete(req, res){
        try{
            const id = req.params.id;
            await this.companyModel.delete(id);
            res.json({message: 'Company deleted successfully'});
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = Company;